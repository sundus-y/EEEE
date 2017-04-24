<?php
class ConfigRefLib
{

	//Configuration for memcached functionality
	public static $memcache_enabled = false;
	public static $memcache_server = 'localhost';
	public static $memcache_port = '11211';  //DEFAULT MEMCACHE PORT IS 11211
	public static $memcache_timeout = 3600; //MEMCACHED EXPIRATION TIMEOUT
	public static $memcache_compression_enabled = TRUE;

	//The name of the header that gets set after logging into opensso
	public static $sso_header_name = 'HTTP_X_IFM_UID';

	// IIMS2 server
	public static $iims2_server_wsdl = "http://intdev.login.ifmsystems.com/IDM_WS_1.0/IdmWebService.asmx?WSDL";

	// Log4PHP configs
	public static $log4phpDir = '/lib/log4php';
	public static $log4phpConfig = '/config/log4php_reflib.xml';

	public static $DATA_DIR = '/data/'; //relative
	//public static $DATA_DIR = 'D:\\src\\spartan_services_reference_library\\data\\'; //absolute
	//public static $DATA_DIR = '/var/www/html/services/reference_library/data/'; //absolute - intdev
	//public static $DATA_DIR = '/Users/aaanim/Documents/workspace/data/';

	/*
	 * Initialize SOAP Client to SSO Service
	 * @return object
	 */
	public static function getSoapClient() {
		try{
			$soap_client = new SoapClient(ConfigRefLib::$iims2_server_wsdl);
		}catch(Exception $e){
			$this->logger->info($e->getMessage());
		}

		return $soap_client;
	}


	/*
	 * Initialize memcache
	 * @return object
	 */
	public static function memcacheInit() {
		try {
			$memcache = new Memcache();
			$memcache->connect(ConfigRefLib::$memcache_server,ConfigRefLib::$memcache_port);
		} catch(Exception $mce) {
			echo $mce->getMessage();
		}

		return (!is_null($memcache)) ? $memcache : null;
	}
}
?>
