<?php
$rootPath = dirname(__FILE__)."/..";
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

$timeformat = "Y-m-d H:i:s";
$timestamp = date($timeformat);
$errors = array();
$warnings = array();

$dataPath = ConfigRefLib::$DATA_DIR == '/data/' ? $rootPath . ConfigRefLib::$DATA_DIR : ConfigRefLib::$DATA_DIR;
try {
	$dataDirectory = dir($dataPath);
} catch (Exception $e) {
	$errors[] = array('time' => date($timeformat), 'msg' => 'Directory "data" don\'t exists');
}

$dataFiles = array();

if ($dataDirectory !== null)
{
	while (($file = $dataDirectory->read()) !== false)
	{
		$extension = strtolower(substr($file, strlen($file) - 4));

		if ($extension == '.xml')
		{
			$dataFiles[] = $dataPath . $file;
		}
	}
	if (count($dataFiles) == 0) $warnings[] = array('time' => date($timeformat), 'msg' => 'Not found data files');
}

// priting output page
header('Content-type: text/xml');
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
echo "<health time=\"$timestamp\">";
if(empty($errors) && empty($warnings)) {
    echo "<status>OK</status>";
} else {
    echo "<status>FAILED</status>";
    echo "<issues>";
    foreach ($warnings as $warning) {
        echo "<issue type=\"warning\" time=\"".$warning['time']."\">".$warning['msg']."</issue>";
    }
    foreach ($errors as $error) {
        echo "<issue type=\"error\" time=\"".$error['time']."\">".$error['msg']."</issue>";
    }
    echo "</issues>";
}
echo "</health>";
?>