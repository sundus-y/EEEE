function Config() {

}

Config.config;
Config.prototype.epcDomain;
Config.prototype.epcContext;
Config.prototype.imagesDomain;
Config.prototype.imagesContext;
Config.prototype.imagesFormat;

Config.getInstance = function() {
    if (!Config.config) {
        // instantiate the singleton
        $.ajax({
                 url: "config.xml",
                 success: function(data) {
                              if(data) {
                                  var config = new Config();
                                  config.epcDomain = $(data).find("epcdomain").text();
                                  config.epcContext = $(data).find("epccontext").text();
                                  config.imagesDomain = $(data).find("imagesdomain").text();
                                  config.imagesContext = $(data).find("imagescontext").text();
                                  config.imagesFormat = $(data).find("imagesformat").text();
                                  Config.config = config;
                              }
                          },
                 async:   false
            });
    }
    return Config.config;
};

Config.prototype.getEPCPrefix = function() {return "/epc";};
//Config.prototype.getEPCPrefix = function() {return this.epcDomain + "/" + this.epcContext;};
