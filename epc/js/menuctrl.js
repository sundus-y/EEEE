    $(document).ready(function(){
        lock =0;
        var height = 45;
        var items = {
                        home:50,
                        agents:165
                    };
        $("#sprite").css({backgroundPosition:''+items[$('.selected').attr("id")]+'px '+height+'px'});
        $("#home,#agents").mouseover(function()
            {
                $("#sprite").stop().animate({backgroundPosition:''+items[$(this).attr("id")]+'px '+height+'px'},{duration:320});
            });

        $("#home,#agents").mouseout(function(){ if(lock == 0) { $("#sprite").stop().animate({backgroundPosition:''+items[$('.selected').attr("id")]+'px '+height+'px'},{duration:320}); } });
        $("#home,#agents").mousedown(function(){ lock =1; });

        $("#home,#agents").click(function(event)
            {
                changeLocation("../" + this.id);
                event.preventDefault();
            });


        //intialize the page to the home location
        changeLocation('../home');
        //changeLocation('../agents'); // for debugging - start with the agents
        });


    function changeLocation(location)
    {
        $.get(location + "/details.xml", function(data)
        {
            //convert the data into a jQuery data object that can be queried
            var jData= $(data);
            
            setTitle(jData.find('title').text());
            loadContent("../" + jData.find('contentURL').text());
        });
    }

    function setTitle(value)
    {
        $("#central_title").html(value);
    }
    function loadContent(url){
        $("#content").load(url);
    }
    function setContent(value)
    {
        $("#content").html(value);
    }

    function fade_in(id)
    {
        setTimeout ( $(id).show('slow'), 2000 );
    }
    function slideToggle(id)
    {
       $('#'+id).slideToggle('slow')
    }
    function toggle(toggle)
    {
       $(toggle).slideToggle('slow');
    }