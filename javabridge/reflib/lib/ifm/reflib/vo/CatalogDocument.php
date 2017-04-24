<?php

class CatalogDocumentVO
{
	var $title = "";
	var $lexicon = 0;
	var $keywords = array();
	var $files = array();
	var $restrictions = array();
	
	var $_explicitType = 'com.infomedia.catalogdocuments.CatalogDocument';
	
	function __construct($title, $lexicon)
	{
		$this->title = $title;
		$this->lexicon = $lexicon;
	}
	
	public function addRestriction($name, $value)
	{
		if ($name != '')
		{
			if($this->restrictions[$name]) 
				$this->restrictions[$name] = $this->restrictions[$name]."|".$value;
			else
				$this->restrictions[$name] = $value;
		}
	}
	
	public function addFile($type, $data)
	{
		if ($type != '') $this->files[$type] = $data;
	}
	
	public function addKeyword($type, $data)
	{
		if ($type != '') $this->keywords[$type] = $data;
	}
}

class CatalogDocumentGroupVO
{
	var $title = "";
	var $lexicon = 0;
	var $sorted = true;
	var $documents = array();
	var $_explicitType = 'com.infomedia.catalogdocuments.CatalogDocumentGroup';
	
	function __construct($title, $lexicon, $sorted)
	{
		$this->title = $title;
		$this->lexicon = $lexicon;
		$this->sorted = $sorted;
	}
	
	public function addDocument($document)
	{
		$this->documents[] = $document;
	}
}
?>