
$(function(){
    // Closing of alert
    $('button.close').on('click', function(){
        $('.alert').fadeOut(1000);
    });

    // Stoping submit of Edit form
    $('#edit-form').submit(function(event){
        if($('#edit-form #title').val().length < 5){
            event.preventDefault();
        }
    })
    // Stoping submit of Edit form
    $("#edit-form").submit( function(e) {
        var messageLength = CKEDITOR.instances['body'].getData().replace(/<[^>]*>/gi, '').length;
        if( !messageLength ) {
            e.preventDefault();
        }
    });

    // Stoping submit of comment
    $('#comment-form').submit(function(event){
        if($('#comment').val().length === 0){
            event.preventDefault();
        }
    })

})
