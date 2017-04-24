<?php

require_once(LOG4PHP_DIR.'/LoggerLevel.php');

// Specifies new logger levels that are higher than the INFO level
if (!defined('LOG4PHP_LEVEL_TRUCK_INT'))
	define('LOG4PHP_LEVEL_TRUCK_INT',        LOG4PHP_LEVEL_INFO_INT + 1); 


class CustomLoggerLevelExample extends LoggerLevel
{
	/**
	 * @param integer $level
	 * @param string $strLevel
	 * @param integer $syslogEquiv
	 */
	function CustomLoggerLevel($level, $strLevel, $syslogEquiv)
      {
          $this->LoggerLevel($level, $strLevel, $syslogEquiv);
      }
      
      /**
       * Returns a TRUCK Level
       * @static
       * @return LoggerLevel
       */
      function getLevelTruck()
      {
          static $level;
          if (!isset($level)) $level = new CustomLoggerLevel(LOG4PHP_LEVEL_TRUCK_INT, 'TRUCK', 0);
          return $level;
      }
      
  
      /**
       * Convert the string passed as argument to a level. If the
       * conversion fails, then this method returns a TRUCK Level.
       *
       * @param mixed $arg
       * @param LoggerLevel $defaultLevel
       * @static 
       */
      function toLevel($arg, $defaultLevel = null)
      {
          if ($arg === null) {
              return $defaultLevel;
          }
          if (is_int($arg)) {
              switch($arg) {
                  case LOG4PHP_LEVEL_TRUCK_INT:   return CustomLoggerLevel::getLevelTruck();
                  default:                        return LoggerLevel::toLevel($arg, $defaultLevel);
              }
          } else {
              switch(strtoupper($arg)) {
                  case 'TRUCK':   return CustomLoggerLevel::getLevelTruck();
                  default:        return LoggerLevel::toLevel($arg, $defaultLevel);
              }
          }
      } 
	
}
?>
