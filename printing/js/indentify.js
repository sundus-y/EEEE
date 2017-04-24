 /**
 * @author: Luke Thompson
 * Date: 06/10/2010
 * Time: 5:20:51 PM
 */

function indentXml(xml) {
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\n$2$3');
    var formatted = '';
    var lines = xml.split('\n');
    var indent = 0;
    for (var i=0; i < lines.length; i++) {
        var ln = lines[i];
        var xmlVersion = /<\?.+\?>/; // is this an xml version tag? ex. <?xml version="1.0"?>
        var openingAndClosing = /<(.+)\b.*?>.*?<\/\1>/;  // is this line a tag open and close on the same line? ex. <div>hello</div>
        var single = /<[^\?]+\/>/; // is this line a single tag? ex. <br />
        var closing = /<\/.+>/; // is this a closing tag? ex. </a>
        var opening = /<[^\?\/]+>/; // is this an opening tag ex. <something>

        var type;
        if( Boolean(ln.match(xmlVersion)) ){
            type='xmlVersion';
        }else if ( Boolean(ln.match(openingAndClosing)) ) {
            type='openingAndClosing';
        }else if ( Boolean(ln.match(single)) ) {
            type='single';
        }else if ( Boolean(ln.match(closing)) ) {
            type='closing';
        }else if ( Boolean(ln.match(opening)) ) {
            type='opening';
        }else{
            type='other';
        }
        
        var padding;
        if( type == 'opening' ){
            padding = buildPadding(indent);
            indent += 1;
        }else if (type == 'closing'){
            indent -= 1;
            padding = buildPadding(indent);
        }else{
            padding = buildPadding(indent);
        }
        if( ln != '' ){
            formatted += padding + ln + '\n';
        }
    }
    return formatted;
}

function stripJsonVariableNameQuotes(jsonString){
    var reg = /(")(.+?)(")(\s?:\s?.+)/g;
    jsonString = jsonString.replace(reg, '$2$4');

    return jsonString;        
}

function indentJson(jsonString) {
    var reg = /(,)(")/g;
    var start = /(\{)/g;
    var end = /(\})(,)?/g;
    jsonString = jsonString.replace(reg, '$1\n$2').replace(start, '\n$1\n').replace(end, '\n$1$2\n');
    var pad = 0;
    var formatted = '';
    var lines = jsonString.split('\n');
    var indent = 0;

    for (var i=0; i < lines.length; i++) {
        var ln = lines[i];
        var opening = Boolean(ln.match(/\{/)); // is this an opening tag?
        var closing = Boolean(ln.match(/\}/)); // is this a closing tag?
        var padding;
        if( opening ){
            padding = buildPadding(indent);
            indent += 1;
        }else if (closing){
            indent -= 1;
            padding = buildPadding(indent);
        }else{
            padding = buildPadding(indent);
        }
        if( ln != '' ){
            formatted += padding + ln + '\n';
        }
    }
    return formatted;
}
function buildPadding(indent){
    var padding = '';
    for (var j = 0; j < indent; j++) {
        padding += '    ';
    }
    return padding;
}