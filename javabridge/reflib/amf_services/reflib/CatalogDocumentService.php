<?php
global $rootPath;
$rootPath = dirname(__FILE__)."/../..";
$libPath = $rootPath.'/lib';
require_once($rootPath."/config/ConfigRefLib.php");

// The following line are needed to setup the logging service
if (!defined('LOG4PHP_DIR'))
	define('LOG4PHP_DIR', $rootPath.ConfigRefLib::$log4phpDir);
if (!defined('LOG4PHP_CONFIGURATION'))
	define('LOG4PHP_CONFIGURATION', $rootPath.ConfigRefLib::$log4phpConfig);
require_once(LOG4PHP_DIR . '/LoggerManager.php');

require_once $libPath.'/ifm/reflib/vo/CatalogDocument.php';
require_once $libPath.'/ifm/reflib/CatalogDataManager.php';

class CatalogDocumentService
{
	private $dir = '';

	function __construct()
	{
		// Initialize the logger
		$this->logger =& LoggerManager::getLogger('CatalogDocumentService');
	}

	public function getCatalogDocumentsByMarket($franchise, $product, $markets, $brands, $language)
	{
	    global $rootPath;

		if ($product == null || $product == "")
		{
			$product = "LIVEPLUS";
		}

		$manager = new CatalogDataManager(ConfigRefLib::$DATA_DIR == '/data/' ? $rootPath . ConfigRefLib::$DATA_DIR : ConfigRefLib::$DATA_DIR);

		$documents = $manager->getDocuments($franchise, $product, $markets, $brands, $language);

		return $documents;
	}
}
?>