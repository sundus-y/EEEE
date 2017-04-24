<?php
$rootPath = dirname(__FILE__)."/../../..";
$libPath = $rootPath.'/lib';
require_once($rootPath."/config/ConfigRefLib.php");

// The following line are needed to setup the logging service
if (!defined('LOG4PHP_DIR'))
	define('LOG4PHP_DIR', $rootPath.ConfigRefLib::$log4phpDir);
if (!defined('LOG4PHP_CONFIGURATION'))
	define('LOG4PHP_CONFIGURATION', $rootPath.ConfigRefLib::$log4phpConfig);
require_once(LOG4PHP_DIR . '/LoggerManager.php');
	
require_once $libPath.'/ifm/reflib/vo/CatalogDocument.php';
	
class CatalogDataManager
{
	private $dataFiles = array();
	
	private $franchise = '';
	private $product = '';
	private $language = '';
	private $markets = '';
	private $brands = '';
	
	private $language_mapping = '';
	
	function __construct($dataPath)
	{
		// Initialize the logger
		$this->logger =& LoggerManager::getLogger('CatalogDataManager');

		$dataDirectory = Dir($dataPath);
		
		if ($dataDirectory !== null)
		{
			while (($file = $dataDirectory->read()) !== false)
			{
				$extension = strtolower(substr($file, strlen($file) - 4));
				
				if ($extension == '.xml')
				{
					$this->dataFiles[] = $dataPath . $file;
				}
			}
		}
	}
	
	private function setMarkets($markets)
	{
		$this->markets = array();
		
		// Ensure that all market flags are lower case, so the market restrictions are always the same case.\
		if (is_array($markets))
		{
			foreach($markets as $market)
			{
				$this->markets[] = strtolower($market);
			}
		}
		else
		{
			$this->markets[] = strtolower($markets);
		}
	}
	
	private function setBrands($brands)
	{
		$this->brands = array();

		if (is_array($brands))
		{
			foreach($brands as $brand)
			{
				$this->brands[] = strtolower($brand);
			}
		}
		else
		{
			if(isset($brands))
				$this->brands[] = strtolower($brands);
		}
	}

	public function getDocuments($franchise, $product, $markets, $brands, $language)
	{
		$this->franchise = $franchise;
		$this->product = $product;
		$this->language = strtolower($language);
		$this->setMarkets($markets);
		$this->setBrands($brands);
		$this->language_mapping = array();
		
		$documents = array();

		if (count($this->dataFiles) == 0) return null;

		foreach($this->dataFiles as $dataFile)
		{
			if (file_exists($dataFile))
			{
				if ($xml = simplexml_load_file($dataFile, 'SimpleXMLElement', LIBXML_NOCDATA))
				{
					// If franchise or product are not set at all in the library then we can assume its a generic product.
					if (isset($xml['franchise']))
					{
						if ($xml['franchise'] != $franchise) continue;
					}
					
					if (isset($xml['product']))
					{
						if ($xml['product'] != $product) continue;
					}

					foreach($xml as $documentItem)
					{
						$item = $this->buildDocumentGroup($documentItem);
						if ($item != null) $documents[] = $item;
					}
				}
			}
		}
		
		$documents = $this->languageFilter($documents);

		return $documents;
	}

	private function languageFilter($documents) 
	{
		$this->createLanguageMap($documents);
		$this->removeUnnecessaryLanguages();
		
		$documents = $this->deleteNonApplicableCatalog($documents);
		
		return $documents;
	}

	private function createLanguageMap($documents) {
		if(is_array($documents))
		{
			foreach($documents AS $document)
			{
				if(is_array($document->documents))
				{
					foreach($document->documents AS $documentElement)
					{
						if($documentElement->restrictions['catalogueCode'])
							$this->language_mapping[$documentElement->restrictions['catalogueCode']] = ($this->language_mapping[$documentElement->restrictions['catalogueCode']] ? $this->language_mapping[$documentElement->restrictions['catalogueCode']]."," : "").$documentElement->restrictions['language'];
						else
							$this->language_mapping[$documentElement->title] = ($this->language_mapping[$documentElement->title] ? $this->language_mapping[$documentElement->title]."," : "").$documentElement->restrictions['language'];
					}
				}
			}
		}
	}
	
	private function removeUnnecessaryLanguages() 
	{
		if(is_array($this->language_mapping))
		{
			foreach($this->language_mapping AS $key => $languageList)
			{
				if(in_array($this->language, explode(',', $languageList)))
					$this->language_mapping[$key] = $this->language;
				else if(in_array('en', explode(',', $languageList)))
					$this->language_mapping[$key] = 'en';
				else
					$this->language_mapping[$key] = '';
			}
		}
	}
	
	private function deleteNonApplicableCatalog($documents)
	{
		if(is_array($documents))
		{
			foreach($documents AS $document)
			{
				if(is_array($document->documents))
				{
					foreach($document->documents AS $key => $documentElement)
					{
						$isValidDoc = $this->validateLanguage($documentElement, ($documentElement->restrictions['catalogueCode'] ? $documentElement->restrictions['catalogueCode'] : $documentElement->title));
						
						if(!$isValidDoc) 
							unset($document->documents[$key]);
					}
					array_unshift($document->documents, array_shift($document->documents));
				}
			}
		}
		
		return $documents;
	}
	
	private function validateLanguage($documentElement, $key) 
	{
		if ($this->franchise == 'HYW')
		{ 
			return empty($documentElement->restrictions['language']) || in_array($this->language, explode(',', $documentElement->restrictions['language']));
		} 
		else
		{
			if($documentElement->restrictions['language'] == $this->language_mapping[$key])
				return true;
			return false;
		}
		return false;
	}
	
	private function buildDocumentGroup($documentItem)
	{
		$result = null;

		switch($documentItem->getName())
		{
			case 'section':
				$title = (string)$documentItem['title'];
				$lexicon = (int)$documentItem['lexiconId'];
				$sorted = (string)$documentItem['sorted'] == 'true';

				$result = new CatalogDocumentGroupVO($title, $lexicon, $sorted);

				foreach($documentItem as $document)
				{
					$item = $this->buildDocumentGroup($document);
					if ($item != null) $result->addDocument($item);
				}

				if (count($result->documents) == 0) $result = null;

				break;

			case 'document':
				$title = (string)$documentItem['title'];
				$lexicon = (int)$documentItem['lexiconId'];

				$result = new CatalogDocumentVO($title, $lexicon);

				foreach($documentItem->files->file as $file)
				{
					$fileType = (string)$file['type'];
					$filePath = (string)$file['data'];

					$result->addFile($fileType, $filePath);
				}

				foreach($documentItem->restrictions->restriction as $restriction)
				{
					$restrictionType = (string)$restriction['type'];
					$restrictionData = (string)$restriction['data'];

					$result->addRestriction($restrictionType, $restrictionData);
				}

				foreach($documentItem->keywords->keyword as $keyword)
				{
					$keywordType = (string)$keyword['type'];
					$keywordData = (string)$keyword['data'];

					$result->addKeyword($keywordType, $keywordData);
				}

				if (!$this->validateRestrictions($result)) $result = null;
				break;
		}

		return $result;
	}

	private function validateRestrictions(CatalogDocumentVO $document)
	{
		if ($document != null)
		{
			foreach($document->restrictions as $restriction => $value)
			{
				switch($restriction)
				{
					case 'market':
						if(count($this->markets) != 0)
						{
							$markets = explode('|', $this->separateRestriction($value));
							$hasMarket = $this->validate($markets, $this->markets);
							if(!$hasMarket)	return false;
						}
						break;

					case 'brand':
						if(count($this->brands) != 0) 
						{
							$brands = explode('|', $this->separateRestriction($value));
							$hasBrand = $this->validate($brands, $this->brands);
							if(!$hasBrand)	return false;
						}
						break;
				}
			}			
		}

		return true;
	}

	private function validate($document_restriction, $array_restriction)
	{
		foreach($document_restriction as $restriction)
		{
			if(in_array(strtolower($restriction), $array_restriction))
				return true;
		}
		return false;
	}
	
	private function separateRestriction($restriction)
	{
		$search = array("-", ",", ".", " ");
		$replace = "|";
		$result = str_replace($search, $replace, $restriction);
		return $result;
	}
}

?>