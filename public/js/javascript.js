$(document).ready(() => {
    var perclick = 0;
    $('#load').click(() => {
        perclick++;
        $.post("/api/post",
            {
                perclick: perclick
            },
            (data) => {
                data.forEach(element => {
                    var mt = element.body.slice(0, 10);
                    var date = JSON.stringify(element.date)
                    $('.load').append('<div class="item"> <h2><a href="/post/' + element._id + '">' + element.title + '</a></h2><p>' + mt + '...</p> ' + element.views + ' <i class="fas fa-eye"></i>&nbsp;&nbsp;&nbsp;&nbsp; ' + date.slice(1, 11) + ' <i class="far fa-calendar-alt"></i></div>')
                });
            });
    })
    $('#search_click').click(() => {
        const search = $('#search').val();
        if (search == []) {
            alert('please enter some text')
        } else {
            $.post("/search",
                {
                    text: search
                },
                (data) => {
                    data.forEach(element => {
                        var mt = element.body.slice(0, 10);
                        var date = JSON.stringify(element.date)
                        $('.main').html('<div class="item"> <h2><a href="/post/' + element._id + '">' + element.title + '</a></h2><p>' + mt + '...</p> ' + element.views + ' <i class="fas fa-eye"></i>&nbsp;&nbsp;&nbsp;&nbsp; ' + date.slice(1, 11) + ' <i class="far fa-calendar-alt"></i></div>')
                    });
                });
        }
    })
});