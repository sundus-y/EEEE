/**
 * Global configuration of services for ajax purposes
 */
var URLS = 
	(
		function () {
			return {
					BASE: '../services/administration/',
					GET_ALL_CACHES: function(){
						return this.BASE + 'caches/get.json';
					},
					REMOVE_CACHE_ITEM: function (cachename) { 
						return this.BASE + 'caches/remove/' + cachename + '/item.json'; 
					},
					OPEN_CACHE_DETAIL_PAGE: function(cachename) {
						return '../admin/cachedetails.html?cacheName=' + cachename;
					},
					GET_CACHE_DETAILS: function (cachename) {
						return this.BASE + 'caches/get/' + cachename + '.json';
					},
					FLUSH_CACHE: function (cachename){
						return this.BASE + 'caches/flush/' + cachename + '.json';
					},
					FLUSH_ALL_CACHES: function (){
						return this.BASE + 'caches/flushall.json';
					},
					GET_ALL_CONNECTIONS: function () { 
						return this.BASE + 'connections/get.json'; 
					},
					GET_ALL_LOGS: function () { 
						return this.BASE + 'logs/get.json'
					},
					OPEN_LOG_DETAIL_PAGE: function (filename, rowCount) {
						return '../admin/logdetails.html?fileName=' + filename + '&rowCount=' + rowCount;
					},
					VIEW_LOG_DETAILS: function (startRow, rowCount) {
						return this.BASE + 'logs/view/' + startRow + '/' + rowCount + '/log.json';
					},
					VIEW_ALL_LOG_DETAILS: function () {
						return this.BASE + 'logs/view/log.json';
					},
					DOWNLOAD_LOG_FILE: function (filename) {
                        return this.BASE + 'logs/download.json';
					},
                    DOWNLOAD_ALL_LOGS: function () {
                        return this.BASE + 'logs/download/all';
                    },
					DELETE_FILES: function () {
						return this.BASE + 'logs/delete.json';
					},
					GET_VERSIONS: function (){
						return this.BASE + 'versions/get/api.json';
					},
					GET_SYSTEM_SNAPSHOT: function () { 
						return this.BASE + 'systemsnapshot/get.json'; 
					},
					GET_LOGGER_SETTINGS: function () {
						return this.BASE + 'loggers/get.json';
					},
					SET_LOGGER_LEVEL: function (level) {
						return this.BASE + 'loggers/set/' + level + '.json';
					},
					GET_SERVER_SNAPSHOT: function () {
						return this.BASE + 'servers/uptime/get.json';
					},
					LOOKUP_SETTING: function () {
						return this.BASE + 'settings/get.json';
					},
					GET_SETTINGS: function (includeoverriden) {
						return this.BASE + 'settings/all/get.json?includeoverriden=' + includeoverriden;
					},
					OPEN_CONFIG_PAGE: function(includeoverriden) {
						return '../admin/configmanager.html?includeoverriden=' + includeoverriden;
					},
					GET_DISK_CACHES_DATA: function(fullpath){
						if (fullpath != 'undefined') {
							return this.BASE + 'diskcaches/get.json?fullpath=' + fullpath;
						} else {
							return this.BASE + 'diskcaches/get.json';
						}
					},
					FLUSH_DISK_CACHE: function (fullpath){
						if (fullpath != 'undefined') {
							return this.BASE + 'diskcaches/flush.json?fullpath=' + fullpath;
						} else {
							return this.BASE + 'diskcaches/flush.json';
						}
					},
					RUN_DISK_CACHE_JANITOR: function (){
						return this.BASE + 'diskcaches/janitor/run.json';
					},
					GET_DISK_CACHE_STATS: function (){
						return this.BASE + 'diskcaches/stats/get.json';
					}
				};
		}
		(URLS)
	);