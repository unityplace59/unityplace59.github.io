var params = {
    owner_id: -142483556,
    album_id: 253636600,
    count:15,
    version: 5.73
};
var posterParams = {
    owner_id: -50601991,
    album_id: 170995194,
    count:10,
    version: 5.73
};

html = '';
function gotAlbums( data){
    var i, al;

    if( !data || !data.response) {
        console.log('VK error:', data); return;
    }
    for( i=0; i<data.response.length;i++) {
        al = data.response[i];
        html = html
            +'<div class="grid-item photos">'
            +'<a class="chocolat-image" href='+al.src_big+'>'
            +'<img src="'+al.src_big+'" alt="" />'
    //      +'<a class="innerImage" href=https://vk.com/photo'+al.owner_id+'_'+al.pid+'>vk</a>'
            +'</a></div>';
    }
    $('.photos').html( html);
}

function text(){

    html = html

        +'<div class="grid-item contacts"> <main class="sectionTitle"><h1>ЮНИТИ<span class="sectionTitle__dots">:</span></h1></main><aside class="about-info"><p class="about-info__p1">Площадка для творческих, креативных и амбициозных<br>где <span class="spanColor">каждый</span> может себя реализовать.</p><br><p class="about-info__p2">В нашем пространстве вы сможете найти для себя каждый раз что то новое:<br>мастер-классы, игры, различные мероприятия, горячий кофе и многое другое!</br>Что именно бует происходит на площадке "Юнити", может зависеть даже от <span class="spanColor">Вас!</span</p</aside>'
        +'</div>';

    $('.photos').html( html);


    html = html
        +'<div class="grid-item contacts"><main class="sectionTitle"><h1>В?<span class="sectionTitle__dots">:</span></h1></main><p>Могу ли я организовать у вас</br> <span class="typed"></span><br /> Сколько это будет соить?<p>'

        +'</div>';

    $('.photos').html( html);

    html = html
        +'<div class="grid-item contacts"><main class="sectionTitle"><h1>О!<span class="sectionTitle__dots">:</span></h1></main><p>Конечно! Мы помогаем любым проектам, независимо от комерческой составляющей.<br>Главное для нас - это твой настрой и готовность реализовать задуманное.<p>'

        +'</div>';

    $('.photos').html( html);

    html = html
        +'<div class="grid-item contacts"> <main class="sectionTitle"><h1>КОНТАКТЫ<span class="sectionTitle__dots">:</span></h1></main><aside class="contact__text"><p>КУЙБЫШЕВА, 38</p><p><span class="spanColor">ЕЖЕДНЕВНО</span></br>С 12:00 до 21:00</p><p>88005553535</p></aside>'

        +'</div>';

    $('.photos').html( html);

}

function gotPosters( data){
    var  i, al;

    if( !data || !data.response) {
        console.log('VK error:', data); return;
    }
    for( i=0; i<data.response.length;i++) {
        al = data.response[i];
        var text = al.text;
        var mass = text.split('<br><br>');
        html = html

            +'<div class="grid-item posters">'
            +'<a class="chocolat-image" title='+mass[1]+' href='+al.src_big+'>'
            +'<img src="'+al.src_big+'" alt="" />'
            +'</a></div>';

    }
    $('.photos').html( html);
}

function vkApi( method, params, callback) {
    var cb = 'cb_vkapi';
    $.ajax({
        url: 'https://api.vk.com/method/'+method,
        data: params,
        dataType: "jsonp",
        callback: cb,
        success: callback
    });
}

vkApi( 'photos.get', params, gotAlbums);
vkApi( 'photos.get', posterParams, gotPosters);

window.onload = function() {

    text();
    // external js: masonry.pkgd.js, imagesloaded.pkgd.js

    // init Masonry after all images have loaded
    var $bgrid = $('.grid').imagesLoaded( function() {
        $bgrid.masonry({
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: '.grid-sizer'
        }); 
    });


    var $grid = $('.grid').isotope({

        itemSelector: '.grid-item',
        getSortData: {
            name: '.name',
            symbol: '.symbol',
            number: '.number parseInt',
            category: '[data-category]',
            weight: function( itemElem ) {
                var weight = $( itemElem ).find('.weight').text();
                return parseFloat( weight.replace( /[\(\)]/g, '') );
            }
        }
    });

    // filter functions
    var filterFns = {
        // show if number is greater than 50
    };

    // bind filter button click
    $('#filters').on( 'click', 'a', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
    });


    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });

        $('.chocolat-parent').Chocolat({

        })

    var typed = new Typed('.typed', {
        strings: ["выставку?", "перфоманс?", "концерт?"],
        typeSpeed: 50,
        backSpeed: 20,
        showCursor: false,
        loop: true,
    });
};

