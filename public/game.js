
//Author: Trey Dettmer
//Last Updated: 12/21/2021

var timerText = document.getElementById("timerText");
var accuracyText = document.getElementById("accuracyText");
var gameInfoDiv = document.getElementById("gameInfoDiv");
var helpButtonDiv = document.getElementById("helpButtonDiv");
var helpMenuDiv = document.getElementById("helpMenuDiv");
var promptDiv = document.getElementById("promptDiv");
var time = 0;
var lastRender = 0;
var previousClickedCountryInfoTime = 0;
var countryList = [];
var previousHovered = [];
var correctlyGuessedCountries = [];
var previousGuessedCountry;
var promptIndex = 0;
var isGameRunning = false;
var guessCount = 0;
var correctGuessCount = 0;
var incorrectGuessCount = 0;
var countryToGuess; 
var helpButtonStickThreshold;
var promptStickThreshold;
var correctCountryColor = "#53784c";
var incorrectCountryColor = "#b30600";
var hintCountryColor = "#8ba879";
var hoveredCountryColor = "#b5b55b";
var baseCountryColor = "#ffff80";
var lightWaterColor = "#beedff";



$(function() 
{ 
    // scroll to the top and set default values
    $(this).scrollTop(0);
    helpMenuDiv.style.display = "none";
    helpButtonDiv.style.visibility = "hidden";
    promptStickThreshold = promptDiv.offsetTop;
    helpButtonStickThreshold = gameInfoDiv.offsetTop;
});

function StartGame()
{
    if (!isGameRunning)
    {
        // display skip button
        $("#skipButton").css("display", "flex");
        // get list of countries and shuffle them
        GeneratePromptOrder();
        // get the first prompt
        GetNextPrompt();
        // start the update loop
        window.requestAnimationFrame(loop);
        isGameRunning = true;
        // remove the start button
        $("#startButtonDiv").remove();
        promptStickThreshold = promptDiv.offsetTop;
        helpButtonStickThreshold = gameInfoDiv.offsetTop;
    }
}

function update(deltaTime)
{
    time += deltaTime;

    // update the displayed time
    timerText.innerText = "Time: " + Math.floor((time/60000).toFixed(2)) + "m " + ((time/1000) % 60).toFixed(1) +"s";  
    
    // check if a hint should be given
    if (incorrectGuessCount >= 3)
    {
        FlashCorrectCountry();
    }

    // check if game should end
    if (correctlyGuessedCountries.length == countryList.length)
    {
        if (isGameRunning)
        {
            EndGame();
            isGameRunning = false;
        }
    }

    
}

function FlashCorrectCountry()
{
    if (countryToGuess != null)
    {
        // make the color of the correct country flash
        if (Math.sin(time * 0.03) > 0.5)
        {
            countryToGuess.style.fill = hintCountryColor;
        }
        else
        {
            countryToGuess.style.fill = baseCountryColor;
        }
    }
}

function EndGame()
{
    // display final time and stats
    timerText.innerText = "Final Time: " + Math.floor((time/60000).toFixed(2)) + "m " + ((time/1000) % 60).toFixed(1) +"s";
    if (guessCount > 0)
    {
        accuracyText.innerText = "Final Accuracy: " + ((correctGuessCount/guessCount)*100).toFixed(1) + "% (" + correctGuessCount + "/" + guessCount + ")";
    }  
    // remove the prompt since the game is over 
    $("#promptDiv").remove();
}

function loop(timestamp) 
{
    // start counting up once the game actually starts
    if (lastRender == 0)
    {
        lastRender = timestamp;
    }

    update(timestamp - lastRender);

    lastRender = timestamp;

    if (isGameRunning)
    {
        // loop again
        window.requestAnimationFrame(loop);
    }
}






var mapData = {
"answers":[{"id":"a0000000","isName":false,"mode":"auto","cols":["Afghanistan"],"path":"af","dotX":528,"dotY":149.2},
{"id":"a0000001","isName":false,"mode":"auto","cols":["Albania"],"path":"al","dotX":425.5,"dotY":124},
{"id":"a0000002","isName":false,"mode":"auto","cols":["Algeria"],"path":"dz","dotX":384.2,"dotY":167.2},
//{"id":"a0000003","isName":false,"mode":"auto","cols":["Andorra"],"path":"ad","dotX":384,"dotY":118.7},
{"id":"a0000004","isName":false,"mode":"auto","cols":["Angola"],"path":"ao","dotX":420,"dotY":301.2},
//{"id":"a0000005","isName":false,"mode":"auto","cols":["Antigua and Barbuda"],"path":"ag","dotX":241.4,"dotY":204},
{"id":"a0000006","isName":false,"mode":"auto","cols":["Argentina"],"path":"ar","dotX":234,"dotY":373},
{"id":"a0000007","isName":false,"mode":"auto","cols":["Armenia"],"path":"am","dotX":480.5,"dotY":125},
{"id":"a0000008","isName":false,"mode":"auto","cols":["Australia"],"path":"au","dotX":683,"dotY":342},
{"id":"a0000009","isName":false,"mode":"auto","cols":["Austria"],"path":"at","dotX":414.2,"dotY":100.9},
{"id":"a0000010","isName":false,"mode":"auto","cols":["Azerbaijan"],"path":"az","dotX":487.6,"dotY":125},
{"id":"a0000011","isName":false,"mode":"auto","cols":["Bahamas"],"path":"bs","dotX":209,"dotY":180.9},
//{"id":"a0000012","isName":false,"mode":"auto","cols":["Bahrain"],"path":"bh","dotX":494.3,"dotY":174},
{"id":"a0000013","isName":false,"mode":"auto","cols":["Bangladesh"],"path":"bd","dotX":583,"dotY":181.8},
//{"id":"a0000014","isName":false,"mode":"auto","cols":["Barbados"],"path":"bb","dotX":246.5,"dotY":217},
{"id":"a0000015","isName":false,"mode":"auto","cols":["Belarus"],"path":"by","dotX":443.4,"dotY":81.2},
{"id":"a0000016","isName":false,"mode":"auto","cols":["Belgium"],"path":"be","dotX":391,"dotY":91},
{"id":"a0000017","isName":false,"mode":"auto","cols":["Belize"],"path":"bz","dotX":180.9,"dotY":203.6},
{"id":"a0000018","isName":false,"mode":"auto","cols":["Benin"],"path":"bj","dotX":385.7,"dotY":225},
{"id":"a0000019","isName":false,"mode":"auto","cols":["Bhutan"],"path":"bt","dotX":584.1,"dotY":169.4},
{"id":"a0000020","isName":false,"mode":"auto","cols":["Bolivia"],"path":"bo","dotX":236,"dotY":319},
{"id":"a0000021","isName":false,"mode":"auto","cols":["Bosnia and Herzegovina"],"path":"ba","dotX":421,"dotY":113},
{"id":"a0000022","isName":false,"mode":"auto","cols":["Botswana"],"path":"bw","dotX":435,"dotY":336.1},
{"id":"a0000023","isName":false,"mode":"auto","cols":["Brazil"],"path":"br","dotX":266,"dotY":294},
{"id":"a0000024","isName":false,"mode":"auto","cols":["Brunei"],"path":"bn","dotX":638.6,"dotY":246.1},
{"id":"a0000025","isName":false,"mode":"auto","cols":["Bulgaria"],"path":"bg","dotX":437.8,"dotY":117.9},
{"id":"a0000026","isName":false,"mode":"auto","cols":["Burkina Faso"],"path":"bf","dotX":377,"dotY":219},
{"id":"a0000027","isName":false,"mode":"auto","cols":["Myanmar"],"path":"mm","dotX":597,"dotY":188.5},
{"id":"a0000028","isName":false,"mode":"auto","cols":["Burundi"],"path":"bi","dotX":447.8,"dotY":272.6},
{"id":"a0000029","isName":false,"mode":"auto","cols":["Cambodia"],"path":"kh","dotX":616,"dotY":219.1},
{"id":"a0000030","isName":false,"mode":"auto","cols":["Cameroon"],"path":"cm","dotX":407,"dotY":247},
{"id":"a0000031","isName":false,"mode":"auto","cols":["Canada"],"path":"ca","dotX":143,"dotY":66},
{"id":"a0000032","isName":false,"mode":"auto","cols":["Cape Verde"],"path":"cv","dotX":326.7,"dotY":206.9},
{"id":"a0000033","isName":false,"mode":"auto","cols":["Central African Republic"],"path":"cf","dotX":427.6,"dotY":239},
{"id":"a0000034","isName":false,"mode":"auto","cols":["Chad"],"path":"td","dotX":422.6,"dotY":209.4},
{"id":"a0000035","isName":false,"mode":"auto","cols":["Chile"],"path":"cl","dotX":218,"dotY":384},
{"id":"a0000036","isName":false,"mode":"auto","cols":["China"],"path":"cn","dotX":615,"dotY":140.9},
{"id":"a0000037","isName":false,"mode":"auto","cols":["Colombia"],"path":"co","dotX":216.3,"dotY":247.5},
//{"id":"a0000038","isName":false,"mode":"auto","cols":["Comoros"],"path":"km","dotX":479.4,"dotY":301.4},
{"id":"a0000039","isName":false,"mode":"auto","cols":["Costa Rica"],"path":"cr","dotX":192,"dotY":228},
{"id":"a0000040","isName":false,"mode":"auto","cols":["Ivory Coast"],"path":"ci","dotX":368,"dotY":235.9},
{"id":"a0000041","isName":false,"mode":"auto","cols":["Croatia"],"path":"hr","dotX":418,"dotY":108},
{"id":"a0000042","isName":false,"mode":"auto","cols":["Cuba"],"path":"cu","dotX":206,"dotY":190.2},
{"id":"a0000043","isName":false,"mode":"auto","cols":["Cyprus"],"path":"cy","dotX":455.3,"dotY":143.7},
{"id":"a0000044","isName":false,"mode":"auto","cols":["Czech Republic"],"path":"cz","dotX":414,"dotY":93.8},
{"id":"a0000045","isName":false,"mode":"auto","cols":["Democratic Republic of the Congo"],"path":"cd","dotX":433,"dotY":267.2},
{"id":"a0000046","isName":false,"mode":"auto","cols":["Denmark"],"path":"dk","dotX":401.5,"dotY":73.5},
{"id":"a0000047","isName":false,"mode":"auto","cols":["Djibouti"],"path":"dj","dotX":476.4,"dotY":221.6},
//{"id":"a0000048","isName":false,"mode":"auto","cols":["Dominica"],"path":"dm","dotX":242.4,"dotY":209.5},
{"id":"a0000049","isName":false,"mode":"auto","cols":["Dominican Republic"],"path":"do","dotX":221,"dotY":197},
{"id":"a0000050","isName":false,"mode":"auto","cols":["East Timor"],"path":"tl","dotX":664.3,"dotY":290.8},
{"id":"a0000051","isName":false,"mode":"auto","cols":["Ecuador"],"path":"ec","dotX":204,"dotY":265.5},
{"id":"a0000052","isName":false,"mode":"auto","cols":["Egypt"],"path":"eg","dotX":447,"dotY":171.3},
{"id":"a0000053","isName":false,"mode":"auto","cols":["El Salvador"],"path":"sv","dotX":180.4,"dotY":215},
{"id":"a0000054","isName":false,"mode":"auto","cols":["Equatorial Guinea"],"path":"gq","dotX":404,"dotY":255.8},
{"id":"a0000055","isName":false,"mode":"auto","cols":["Eritrea"],"path":"er","dotX":466.3,"dotY":209.2},
{"id":"a0000056","isName":false,"mode":"auto","cols":["Estonia"],"path":"ee","dotX":439,"dotY":64.8},
{"id":"a0000057","isName":false,"mode":"auto","cols":["Ethiopia"],"path":"et","dotX":470,"dotY":234.2},
//{"id":"a0000058","isName":false,"mode":"auto","cols":["Federated States of Micronesia"],"path":"fm","dotX":717.7,"dotY":235.2},
{"id":"a0000059","isName":false,"mode":"auto","cols":["Fiji"],"path":"fj","dotX":782.9,"dotY":320.1},
{"id":"a0000060","isName":false,"mode":"auto","cols":["Finland"],"path":"fi","dotX":437,"dotY":52},
{"id":"a0000061","isName":false,"mode":"auto","cols":["France"],"path":"fr","dotX":386,"dotY":105},
{"id":"a0000062","isName":false,"mode":"auto","cols":["Gabon"],"path":"ga","dotX":406.5,"dotY":264},
{"id":"a0000063","isName":false,"mode":"auto","cols":["Gambia"],"path":"gm","dotX":344,"dotY":216},
{"id":"a0000064","isName":false,"mode":"auto","cols":["Georgia"],"path":"ge","dotX":479,"dotY":120},
{"id":"a0000065","isName":false,"mode":"auto","cols":["Germany"],"path":"de","dotX":404,"dotY":89.9},
{"id":"a0000066","isName":false,"mode":"auto","cols":["Ghana"],"path":"gh","dotX":378.2,"dotY":234.5},
{"id":"a0000067","isName":false,"mode":"auto","cols":["Greece"],"path":"gr","dotX":430,"dotY":129},
//{"id":"a0000068","isName":false,"mode":"auto","cols":["Grenada"],"path":"gd","dotX":241.6,"dotY":220.6},
{"id":"a0000069","isName":false,"mode":"auto","cols":["Guatemala"],"path":"gt","dotX":177.4,"dotY":210},
{"id":"a0000070","isName":false,"mode":"auto","cols":["Guinea"],"path":"gn","dotX":353.3,"dotY":224.2},
{"id":"a0000071","isName":false,"mode":"auto","cols":["Guinea-Bissau"],"path":"gw","dotX":347.7,"dotY":220.3},
{"id":"a0000072","isName":false,"mode":"auto","cols":["Guyana"],"path":"gy","dotX":248,"dotY":242},
{"id":"a0000073","isName":false,"mode":"auto","cols":["Haiti"],"path":"ht","dotX":218,"dotY":196},
{"id":"a0000074","isName":false,"mode":"auto","cols":["Honduras"],"path":"hn","dotX":184.5,"dotY":210.7},
{"id":"a0000075","isName":false,"mode":"auto","cols":["Hungary"],"path":"hu","dotX":424.4,"dotY":103.1},
{"id":"a0000076","isName":false,"mode":"auto","cols":["Iceland"],"path":"is","dotX":341,"dotY":43},
{"id":"a0000077","isName":false,"mode":"auto","cols":["India"],"path":"in","dotX":556,"dotY":185.9},
{"id":"a0000078","isName":false,"mode":"auto","cols":["Indonesia"],"path":"id","dotX":635.5,"dotY":264},
{"id":"a0000079","isName":false,"mode":"auto","cols":["Iran"],"path":"ir","dotX":501.3,"dotY":152.5},
{"id":"a0000080","isName":false,"mode":"auto","cols":["Iraq"],"path":"iq","dotX":478.8,"dotY":149.9},
{"id":"a0000081","isName":false,"mode":"auto","cols":["Ireland"],"path":"ie","dotX":363,"dotY":82.5},
{"id":"a0000082","isName":false,"mode":"auto","cols":["Israel"],"path":"il","dotX":459,"dotY":157},
{"id":"a0000083","isName":false,"mode":"auto","cols":["Italy"],"path":"it","dotX":416.4,"dotY":124.2},
{"id":"a0000084","isName":false,"mode":"auto","cols":["Jamaica"],"path":"jm","dotX":206,"dotY":200.2},
{"id":"a0000085","isName":false,"mode":"auto","cols":["Japan"],"path":"jp","dotX":693.3,"dotY":140},
{"id":"a0000086","isName":false,"mode":"auto","cols":["Jordan"],"path":"jo","dotX":462.3,"dotY":158.9},
{"id":"a0000087","isName":false,"mode":"auto","cols":["Kazakhstan"],"path":"kz","dotX":533,"dotY":100},
{"id":"a0000088","isName":false,"mode":"auto","cols":["Kenya"],"path":"ke","dotX":465.8,"dotY":259.9},
//{"id":"a0000089","isName":false,"mode":"auto","cols":["Kiribati"],"path":"ki","dotX":21,"dotY":272},
{"id":"a0000090","isName":false,"mode":"auto","cols":["Kosovo"],"path":"xk","dotX":427.5,"dotY":118.5},
{"id":"a0000091","isName":false,"mode":"auto","cols":["Kuwait"],"path":"kw","dotX":487,"dotY":162.9},
{"id":"a0000092","isName":false,"mode":"auto","cols":["Kyrgyzstan"],"path":"kg","dotX":548,"dotY":122},
{"id":"a0000093","isName":false,"mode":"auto","cols":["Laos"],"path":"la","dotX":610.3,"dotY":194.9},
{"id":"a0000094","isName":false,"mode":"auto","cols":["Latvia"],"path":"lv","dotX":438,"dotY":70.6},
{"id":"a0000095","isName":false,"mode":"auto","cols":["Lebanon"],"path":"lb","dotX":461.7,"dotY":146.8},
{"id":"a0000096","isName":false,"mode":"auto","cols":["Lesotho"],"path":"ls","dotX":444,"dotY":360.5},
{"id":"a0000097","isName":false,"mode":"auto","cols":["Liberia"],"path":"lr","dotX":359.2,"dotY":239.6},
{"id":"a0000098","isName":false,"mode":"auto","cols":["Libya"],"path":"ly","dotX":419.3,"dotY":172.9},
//{"id":"a0000099","isName":false,"mode":"auto","cols":["Liechtenstein"],"path":"li","dotX":402,"dotY":103.1},
{"id":"a0000100","isName":false,"mode":"auto","cols":["Lithuania"],"path":"lt","dotX":434.3,"dotY":76.3},
{"id":"a0000101","isName":false,"mode":"auto","cols":["Luxembourg"],"path":"lu","dotX":394.3,"dotY":94.2},
{"id":"a0000102","isName":false,"mode":"auto","cols":["North Macedonia"],"path":"mk","dotX":429.5,"dotY":121.7},
{"id":"a0000103","isName":false,"mode":"auto","cols":["Madagascar"],"path":"mg","dotX":486,"dotY":324.3},
{"id":"a0000104","isName":false,"mode":"auto","cols":["Malawi"],"path":"mw","dotX":456,"dotY":307},
{"id":"a0000105","isName":false,"mode":"auto","cols":["Malaysia"],"path":"my","dotX":610.3,"dotY":247.2},
//{"id":"a0000106","isName":false,"mode":"auto","cols":["Maldives"],"path":"mv","dotX":545.9,"dotY":248.9},
{"id":"a0000107","isName":false,"mode":"auto","cols":["Mali"],"path":"ml","dotX":377,"dotY":202.2},
//{"id":"a0000108","isName":false,"mode":"auto","cols":["Malta"],"path":"mt","dotX":412.9,"dotY":141.1},
//{"id":"a0000109","isName":false,"mode":"auto","cols":["Marshall Islands"],"path":"mh","dotX":760.6,"dotY":232.2},
{"id":"a0000110","isName":false,"mode":"auto","cols":["Mauritania"],"path":"mr","dotX":354,"dotY":195.5},
{"id":"a0000111","isName":false,"mode":"auto","cols":["Mauritius"],"path":"mu","dotX":510.1,"dotY":329.1},
{"id":"a0000112","isName":false,"mode":"auto","cols":["Mexico"],"path":"mx","dotX":151,"dotY":182},
{"id":"a0000113","isName":false,"mode":"auto","cols":["Moldova"],"path":"md","dotX":444.4,"dotY":102},
//{"id":"a0000114","isName":false,"mode":"auto","cols":["Monaco"],"path":"mc","dotX":397.2,"dotY":114.5},
{"id":"a0000115","isName":false,"mode":"auto","cols":["Mongolia"],"path":"mn","dotX":614.2,"dotY":104.1},
{"id":"a0000116","isName":false,"mode":"auto","cols":["Montenegro"],"path":"me","dotX":423.7,"dotY":117.8},
{"id":"a0000117","isName":false,"mode":"auto","cols":["Morocco"],"path":"ma","dotX":366,"dotY":153.5},
{"id":"a0000118","isName":false,"mode":"auto","cols":["Mozambique"],"path":"mz","dotX":467,"dotY":309.5},
{"id":"a0000119","isName":false,"mode":"auto","cols":["Namibia"],"path":"na","dotX":418,"dotY":328},
//{"id":"a0000120","isName":false,"mode":"auto","cols":["Nauru"],"path":"nr","dotX":755,"dotY":264},
{"id":"a0000121","isName":false,"mode":"auto","cols":["Nepal"],"path":"np","dotX":569.8,"dotY":166.5},
{"id":"a0000122","isName":false,"mode":"auto","cols":["Netherlands"],"path":"nl","dotX":393,"dotY":86.9},
{"id":"a0000123","isName":false,"mode":"auto","cols":["New Zealand"],"path":"nz","dotX":776.7,"dotY":391.9},
{"id":"a0000124","isName":false,"mode":"auto","cols":["Nicaragua"],"path":"ni","dotX":188.2,"dotY":218.1},
{"id":"a0000125","isName":false,"mode":"auto","cols":["Niger"],"path":"ne","dotX":403.3,"dotY":203.9},
{"id":"a0000126","isName":false,"mode":"auto","cols":["Nigeria"],"path":"ng","dotX":398,"dotY":230.8},
{"id":"a0000127","isName":false,"mode":"auto","cols":["North Korea"],"path":"kp","dotX":665.7,"dotY":127},
{"id":"a0000128","isName":false,"mode":"auto","cols":["Norway"],"path":"no","dotX":401.7,"dotY":57},
{"id":"a0000129","isName":false,"mode":"auto","cols":["Oman"],"path":"om","dotX":509.33,"dotY":187.2},
{"id":"a0000130","isName":false,"mode":"auto","cols":["Pakistan"],"path":"pk","dotX":535.7,"dotY":164.2},
//{"id":"a0000131","isName":false,"mode":"auto","cols":["Palau"],"path":"pw","dotX":680.5,"dotY":241.3},
{"id":"a0000132","isName":false,"mode":"auto","cols":["Panama"],"path":"pa","dotX":198,"dotY":232.5},
{"id":"a0000133","isName":false,"mode":"auto","cols":["Papua New Guinea"],"path":"pg","dotX":703.7,"dotY":282.4},
{"id":"a0000134","isName":false,"mode":"auto","cols":["Paraguay"],"path":"py","dotX":248.9,"dotY":339.7},
{"id":"a0000135","isName":false,"mode":"auto","cols":["Peru"],"path":"pe","dotX":208,"dotY":292},
{"id":"a0000136","isName":false,"mode":"auto","cols":["Philippines"],"path":"ph","dotX":657,"dotY":220.6},
{"id":"a0000137","isName":false,"mode":"auto","cols":["Poland"],"path":"pl","dotX":423.6,"dotY":87.1},
{"id":"a0000138","isName":false,"mode":"auto","cols":["Portugal"],"path":"pt","dotX":361.7,"dotY":127.6},
{"id":"a0000139","isName":false,"mode":"auto","cols":["Qatar"],"path":"qa","dotX":495.7,"dotY":176.2},
{"id":"a0000140","isName":false,"mode":"auto","cols":["Republic of the Congo"],"path":"cg","dotX":416.9,"dotY":260.5},
{"id":"a0000141","isName":false,"mode":"auto","cols":["Romania"],"path":"ro","dotX":436.7,"dotY":107.1},
{"id":"a0000142","isName":false,"mode":"auto","cols":["Russia"],"path":"ru","dotX":577,"dotY":52},
{"id":"a0000143","isName":false,"mode":"auto","cols":["Rwanda"],"path":"rw","dotX":447.8,"dotY":267.7},
//{"id":"a0000144","isName":false,"mode":"auto","cols":["Saint Kitts and Nevis"],"path":"kn","dotX":239.4,"dotY":203.4},
//{"id":"a0000145","isName":false,"mode":"auto","cols":["Saint Lucia"],"path":"lc","dotX":243.2,"dotY":214.6},
//{"id":"a0000146","isName":false,"mode":"auto","cols":["Saint Vincent and the Grenadines"],"path":"vc","dotX":242.7,"dotY":216.8},
{"id":"a0000147","isName":false,"mode":"auto","cols":["Samoa"],"path":"ws","dotX":802.8,"dotY":307.7},
//{"id":"a0000148","isName":false,"mode":"auto","cols":["San Marino"],"path":"sm","dotX":408.5,"dotY":113.9},
//{"id":"a0000149","isName":false,"mode":"auto","cols":["S\u00e3o Tom\u00e9 and Pr\u00edncipe"],"path":"st","dotX":395.5,"dotY":260.6},
{"id":"a0000150","isName":false,"mode":"auto","cols":["Saudi Arabia"],"path":"sa","dotX":482.1,"dotY":179.9},
{"id":"a0000151","isName":false,"mode":"auto","cols":["Senegal"],"path":"sn","dotX":347,"dotY":212},
{"id":"a0000152","isName":false,"mode":"auto","cols":["Serbia"],"path":"rs","dotX":427.6,"dotY":113},
//{"id":"a0000153","isName":false,"mode":"auto","cols":["Seychelles"],"path":"sc","dotX":506.5,"dotY":276},
{"id":"a0000154","isName":false,"mode":"auto","cols":["Sierra Leone"],"path":"sl","dotX":354,"dotY":232.9},
//{"id":"a0000155","isName":false,"mode":"auto","cols":["Singapore"],"path":"sg","dotX":614.2,"dotY":256.7},
{"id":"a0000156","isName":false,"mode":"auto","cols":["Slovakia"],"path":"sk","dotX":423,"dotY":98},
{"id":"a0000157","isName":false,"mode":"auto","cols":["Slovenia"],"path":"si","dotX":413,"dotY":106.5},
{"id":"a0000158","isName":false,"mode":"auto","cols":["Solomon Islands"],"path":"sb","dotX":742.1,"dotY":295},
{"id":"a0000159","isName":false,"mode":"auto","cols":["Somalia"],"path":"so","dotX":488,"dotY":230},
{"id":"a0000160","isName":false,"mode":"auto","cols":["South Africa"],"path":"za","dotX":431,"dotY":365},
{"id":"a0000161","isName":false,"mode":"auto","cols":["South Korea"],"path":"kr","dotX":669,"dotY":139},
{"id":"a0000162","isName":false,"mode":"auto","cols":["South Sudan"],"path":"ss","dotX":449.6,"dotY":239.5},
{"id":"a0000163","isName":false,"mode":"auto","cols":["Spain"],"path":"es","dotX":372,"dotY":127.5},
{"id":"a0000164","isName":false,"mode":"auto","cols":["Sri Lanka"],"path":"lk","dotX":562,"dotY":235.3},
{"id":"a0000165","isName":false,"mode":"auto","cols":["Sudan"],"path":"sd","dotX":448.5,"dotY":209.5},
{"id":"a0000166","isName":false,"mode":"auto","cols":["Suriname"],"path":"sr","dotX":254.4,"dotY":248.1},
{"id":"a0000167","isName":false,"mode":"auto","cols":["Eswatini"],"path":"sz","dotX":451.3,"dotY":350.1},
{"id":"a0000168","isName":false,"mode":"auto","cols":["Sweden"],"path":"se","dotX":414.3,"dotY":60.5},
{"id":"a0000169","isName":false,"mode":"auto","cols":["Switzerland"],"path":"ch","dotX":398.4,"dotY":103.5},
{"id":"a0000170","isName":false,"mode":"auto","cols":["Syria"],"path":"sy","dotX":467,"dotY":143},
{"id":"a0000171","isName":false,"mode":"auto","cols":["Taiwan"],"path":"tw","dotX":652.9,"dotY":182.1},
{"id":"a0000172","isName":false,"mode":"auto","cols":["Tajikistan"],"path":"tj","dotX":545.2,"dotY":133.5},
{"id":"a0000173","isName":false,"mode":"auto","cols":["Tanzania"],"path":"tz","dotX":459.1,"dotY":282.5},
{"id":"a0000174","isName":false,"mode":"auto","cols":["Thailand"],"path":"th","dotX":608,"dotY":207.9},
{"id":"a0000175","isName":false,"mode":"auto","cols":["Togo"],"path":"tg","dotX":383,"dotY":232.4},
//{"id":"a0000176","isName":false,"mode":"auto","cols":["Tonga"],"path":"to","dotX":798.1,"dotY":328.7},
{"id":"a0000177","isName":false,"mode":"auto","cols":["Trinidad and Tobago"],"path":"tt","dotX":242.5,"dotY":226.6},
{"id":"a0000178","isName":false,"mode":"auto","cols":["Tunisia"],"path":"tn","dotX":401,"dotY":148},
{"id":"a0000179","isName":false,"mode":"auto","cols":["Turkey"],"path":"tr","dotX":460.3,"dotY":130.6},
{"id":"a0000180","isName":false,"mode":"auto","cols":["Turkmenistan"],"path":"tm","dotX":513,"dotY":130.6},
//{"id":"a0000181","isName":false,"mode":"auto","cols":["Tuvalu"],"path":"tv","dotX":785,"dotY":295.3},
{"id":"a0000182","isName":false,"mode":"auto","cols":["Uganda"],"path":"ug","dotX":453.1,"dotY":256.6},
{"id":"a0000183","isName":false,"mode":"auto","cols":["Ukraine"],"path":"ua","dotX":450.6,"dotY":96},
{"id":"a0000184","isName":false,"mode":"auto","cols":["United Arab Emirates"],"path":"ae","dotX":502,"dotY":182.5},
{"id":"a0000185","isName":false,"mode":"auto","cols":["United Kingdom"],"path":"gb","dotX":377,"dotY":86},
{"id":"a0000186","isName":false,"mode":"auto","cols":["United States"],"path":"us","dotX":153,"dotY":129},
{"id":"a0000187","isName":false,"mode":"auto","cols":["Uruguay"],"path":"uy","dotX":254.9,"dotY":370.2},
{"id":"a0000188","isName":false,"mode":"auto","cols":["Uzbekistan"],"path":"uz","dotX":525,"dotY":122.5},
{"id":"a0000189","isName":false,"mode":"auto","cols":["Vanuatu"],"path":"vu","dotX":759,"dotY":318.6},
//{"id":"a0000190","isName":false,"mode":"auto","cols":["Vatican City"],"path":"va","dotX":408.5,"dotY":120.7},
{"id":"a0000191","isName":false,"mode":"auto","cols":["Venezuela"],"path":"ve","dotX":232,"dotY":235},
{"id":"a0000192","isName":false,"mode":"auto","cols":["Vietnam"],"path":"vn","dotX":624.3,"dotY":219.9},
{"id":"a0000193","isName":false,"mode":"auto","cols":["Yemen"],"path":"ye","dotX":488.3,"dotY":208.2},
{"id":"a0000194","isName":false,"mode":"auto","cols":["Zambia"],"path":"zm","dotX":438,"dotY":310},
{"id":"a0000195","isName":false,"mode":"auto","cols":["Zimbabwe"],"path":"zw","dotX":447,"dotY":325}]};




// Fisher-Yates shuffling algorithm
const shuffleArray = array => 
{
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}



function GeneratePromptOrder()
{
    // create list of all of the countries
    for (let i = 0; i < mapData.answers.length; i++)
    {
        countryList[i] = mapData.answers[i].cols[0];
    }
    // shuffle the list of countries
    shuffleArray(countryList);
}

function GetNextPrompt()
{
    $("#promptText").html("Locate: <b>" + countryList[promptIndex] + "</b>")
    var result = mapData.answers.find(obj => obj.cols[0] == countryList[promptIndex]);   
    countryToGuess = document.getElementById(result.path)
    incorrectGuessCount = 0;
    
}

function SkipPrompt()
{
    if (isGameRunning)
    {
        var country = countryList.shift();
        countryList[countryList.length] = country;
        GetNextPrompt();
    }
}

function ClickedOnMap(e)
{
    if (isGameRunning)
    {
        var pathID = $(e.target).attr("id");

        // check if we clicked on a country
        if (null != pathID && pathID != "ocean" && pathID != "svg2")
        {
            var result = mapData.answers.find(obj => obj.path == pathID);
            if (null != result)
            {
                if (correctlyGuessedCountries.includes(document.getElementById(result.path)))
                {
                    DisplayCountryInfo(result);
                    return;
                }
                else if (previousGuessedCountry == document.getElementById(result.path))
                {
                    return;
                }


                guessCount++;

                // change the previously guessed country's color back to the base color
                if (previousGuessedCountry != null && !correctlyGuessedCountries.includes(previousGuessedCountry))
                {
                    previousGuessedCountry.style.fill = baseCountryColor;
                }

                // check if country was correctly guessed
                if (result.cols[0] == countryList[promptIndex])
                {
                    var countryPath = document.getElementById(result.path);
                    correctlyGuessedCountries.push(countryPath);
                    previousGuessedCountry = document.getElementById(result.path);
                    countryPath.style.fill = correctCountryColor;
                    correctGuessCount++;
                    promptIndex++;
                    GetNextPrompt();
                }
                else // incorrect guess
                {       
                    previousGuessedCountry = document.getElementById(result.path);
                    previousGuessedCountry.style.fill = incorrectCountryColor;
                    incorrectGuessCount++;
                }         
            }

        }

        // update the current stats
        if (guessCount > 0)
        {
            accuracyText.innerHTML = "Accuracy: " + ((correctGuessCount/guessCount)*100).toFixed(1) + "% (" + correctGuessCount + "/" + guessCount + ")<br>Countries Remaining: " + (isNaN(countryList.length - correctlyGuessedCountries.length) ? 0 : countryList.length - correctlyGuessedCountries.length) + "";
        }

        // change previously hovered country back to its original color
        if (previousHovered.length > 0)
        {
            if (!correctlyGuessedCountries.includes(previousHovered[0],0))
            {
                if (previousHovered[0].getAttribute('class').includes("light-water"))
                {
                    previousHovered[0].style.fill = lightWaterColor;
                }
                else
                {
                    if (previousGuessedCountry != previousHovered[0])
                    {
                        previousHovered[0].style.fill = baseCountryColor;
                    }
                }
                
            }
            previousHovered.shift();
        }

        if (incorrectGuessCount >= 3)
        {
            SnapToCorrectLocation();
        }
    }

}

function SnapToCorrectLocation()
{

    var countryInfo = mapData.answers.find(obj => obj.cols[0] == countryList[promptIndex]);

    var countryElement = document.getElementById(countryInfo.path);
    var rect = countryElement.getBBox();
    var countryXNormalized = rect.x / 810;
    var countryYNormalized = rect.y / 450;
    var mapStartY = document.getElementById("map").getBoundingClientRect().y + window.pageYOffset;
    var mapHeight = document.getElementById("map").getBoundingClientRect().height;
    var idealYPosition = (mapStartY + ((mapHeight - mapStartY) * countryYNormalized)) - (window.innerHeight/2);
    var idealXPosition = (countryXNormalized * (2020-$("#map").width()));
    var start;
    var startingX = $("#map").scrollLeft();
    var startingY = $(document).scrollTop();
    var duration = 300.0;
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        // Elapsed milliseconds since start of scrolling.
        var time = timestamp - start;
        // Get percent of completion in range [0, 1].
        var percent = Math.min(time / duration, 1);
        $("#map").scrollLeft(startingX + percent * (idealXPosition - startingX));
        $(document).scrollTop(startingY + percent * ((idealYPosition) - startingY));
    
        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
            window.requestAnimationFrame(step);
        }
        })
}


function DisplayCountryInfo(countryInfo)
{
    if (time - previousClickedCountryInfoTime > 1000)
    {
        previousClickedCountryInfoTime = time;
        document.getElementById("clickedCountryInfoDiv").innerHTML = "<h2>You located: <b>" + countryInfo.cols[0] + "</b>";
        $("#clickedCountryInfoDiv").fadeIn(100);
        $("#clickedCountryInfoDiv").delay(1000).fadeOut();
    }
}


function HoveringOverMap(e)
{
    if (isGameRunning)
    {
        var pathID = $(e.target).attr("id");
        
        if (null != pathID && pathID != "svg2")
        {
            // change previously hovered country back to its original color
            if (previousHovered.length > 0)
            {
                if (!correctlyGuessedCountries.includes(previousHovered[0],0))
                {
                    if (previousHovered[0].getAttribute('class').includes("light-water"))
                    {
                        previousHovered[0].style.fill = lightWaterColor;
                    }
                    else
                    {
                        if (previousGuessedCountry != previousHovered[0])
                        {
                            previousHovered[0].style.fill = baseCountryColor;
                        }
                    }
                    
                }
                previousHovered.shift();
            }

            var result = mapData.answers.find(obj => obj.path == pathID);
            if (null != result)
            {
                // if we are hovering over a country, change its color
                var countryPath = document.getElementById(result.path);
                if (countryPath != null)
                {

                    if (!correctlyGuessedCountries.includes(countryPath,0) && previousGuessedCountry != countryPath)
                    {
                        countryPath.style.fill = hoveredCountryColor;
                    }
                    previousHovered.push(countryPath);
                }      
            }

        }
    }
}

function zoomOutMobile() {
    var viewport = document.querySelector('meta[name="viewport"]');
  
    if ( viewport ) {
      viewport.content = "initial-scale=0.1";
      viewport.content = "width=device-width";
    }
}
  
  


// toggles between displaying and hiding the help menu
function ToggleHelpMenu()
{
    if (helpMenuDiv.style.display == "none")
    {
        console.log("Making visible");
        helpMenuDiv.style.display = "flex";
        helpButtonDiv.innerHTML = "<b>X</b>";
    }
    else
    {
        console.log("hiding");
        helpMenuDiv.style.display = "none";
        helpButtonDiv.innerHTML = "<b>?</b>";
    }
}



// keep help button and prompt at the top of the screen even when scrolled
$(document).on("scroll",function() {
    if ($(this).scrollTop() >= helpButtonStickThreshold) {
        if (helpButtonDiv.style.visibility != "visible")
        {
            helpButtonDiv.style.visibility= "visible";
        }
    } else {
        if (helpButtonDiv.style.visibility == "visible" && helpMenuDiv.style.display == "none")
        {
            helpButtonDiv.style.visibility = "hidden";
        }
    }

    if (window.pageYOffset >= promptStickThreshold ) {
        $("#promptDiv").addClass('sticky-prompt');
    }
    else
    {
        $("#promptDiv").removeClass('sticky-prompt');
    } 
});

// bind events
$("#startButton").on("click",this.StartGame);
$("#map").on("mouseover", this.HoveringOverMap);
$("#map").on("click",this.ClickedOnMap);
$("#helpButtonDiv").on("click",this.ToggleHelpMenu);
$("#skipButton").on("click",this.SkipPrompt);