# This project is a template for creating web services using PHP.
# 
# Dependencies:  PHP Unit (installed using PEAR.)  
# For installation instructions, see: http://www.phpunit.de/manual/current/en/installation.html)
#
# Below is the layout of the directory structure:


/amf_php  - The core AMF PHP library / container.  
/amf_services  - This directory contains the AMF services you will create for this project.
/amf_services/amfphp/DiscoveryService.php  - Auto-Discovery file needed for AMF PHP.  This file is copied from the core AMF PHP library, originally under <AMF PHP HOME> /services/.
/config  - Global configuration parameters for this project and log4php configs.
/db  - Database create scripts / dump files should go here.
/doc  - Supplemental documentation about the services should go here.
/lib  - Source code (besides service calls) and 3rd part libraries should be placed here in an appropriate package structure.
/log  - Generated log files are placed in this directory
/test  - Testing scripts.  PHP Unit, Apache Bench for load testing, etc.
/web_services  - Non-AMF web service calls are placed here.  (Ex: XML web services, etc.)
