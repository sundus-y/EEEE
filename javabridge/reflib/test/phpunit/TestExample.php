<?php

// (NOTE: PHP Unit must be installed using PEAR)
// For installation instructions, see: http://www.phpunit.de/manual/current/en/installation.html
// To run this test, issue the following command:
// > phpunit TestExample.php
//

require_once('PHPUnit/Framework.php');
 
class TestExample extends PHPUnit_Framework_TestCase
{
    public function testCompareNumbers()
    {
        // Create the fixture.
        $fixture = 2;
 
        // Assert that the size of the Array fixture is greater than 1
        $this->assertGreaterThan(1, $fixture);
    }
 
}
?>
