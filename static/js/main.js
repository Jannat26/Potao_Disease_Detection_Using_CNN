$(document).ready( function() {
    $('.result').hide();
    $('.Lblight').hide();
    $('.Healthy').hide();
    $('.Eblight').hide();
   
    //image_preview 
    $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
    
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this);
        $('.result').text('');
        $('.result').show();
        $('.Lblight').hide();
        $('.Healthy').hide();
        $('.Eblight').hide();

    }); 	

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                $('.result').fadeIn(600);
                $('.result').text(data);
                console.log(typeof(data))
                if(data == 'Late Blight'){
                    $('.Lblight').show();
                    $('.Healthy').hide();
                    $('.Eblight').hide();}
               
                else if(data == 'Healthy'){
                    $('.Healthy').show();
                    $('.Lblight').hide();
                    $('.Eblight').hide();
                    }
                else if(data == 'Early Blight'){
                    $('.Healthy').hide();
                    $('.Lblight').hide();
                    $('.Eblight').show();
                    }
                    
                
                console.log('Success!');
            },
        });
    });
});