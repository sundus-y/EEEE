<?php
/*
 * Created on 26/01/2009
 */
 
// Setup Pathing and included files needed for this service
$rootPath = dirname(__FILE__)."/../..";
$libPath = $rootPath.'/lib';
require_once($libPath."/ifm/example/HelloWorldController.php");

$value = $_REQUEST['hello'];  // GET param (Ex: /HelloWorldXMLService?hello=world)

$helloWorldController = new HelloWorldController();

// (NOTE: All Business logic should be under the /lib directory with only the call in this file.)
echo $helloWorldController->getHelloGreatingXML($value);

?>
