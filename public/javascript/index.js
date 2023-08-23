$(document).ready(function() {

    // signup    
    $('.signup').submit( async function(e){
        e.preventDefault();
        const form = document.querySelector('form');
        console.log($("input[name='isExperienced']:checked").val());

        // reset errors
        $("fnameError").text('');
        $("fathernameError").text('');
        $("dobError").text('');
        $("genderError").text('');
        $("mobileError").text('');
        $("standardError").text('');
        $("emailError").text('');
        $("passwordError").text('');
        
        // get values
        const formData = {
            fname: form.fname.value,
            lname: form.lname.value,
            dob: form.dob.value,
            gender: form.gender.value,
            isExperienced: $("input[name='isExperienced']:checked").val(),
            mobile: form.mobile.value,
            preferredClass: form.preferredclass.value,
            email : form.email.value,
            password: form.password.value
        }

        try {
            const res = await fetch('/signup', { 
                method: 'POST', 
                body: JSON.stringify(formData),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                console.log(data);
                $(".fname.error").text(data.errors.fname);
                $(".dob.error").text(data.errors.dob);
                $(".gender.error").text(data.errors.gender);    
                $(".mobile.error").text(data.errors.mobile);
                $(".standard.error").text(data.errors.standard);
                $(".email.error").text(data.errors.email);
                $(".password.error").text(data.errors.password);
            }
            if (data.teacher) {
                location.assign('/');
            }
            
        }
        catch (err) {
            console.log(err);
        }
    
    });

    // login
    $('.login').submit( async function(e){
        e.preventDefault();
        const form = document.querySelector('form');
        // reset errors
        $('.email.error').text('');
        $('.password.error').text('');
        // get values
        const email = form.email.value;
        const password = form.password.value;

        try {
            const res = await fetch('/login', { 
                method: 'POST', 
                body: JSON.stringify({ email, password }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log("this is data", data);

            if (data.errors) {
                for (error of data.errors){
                    let path = error.path;
                    let string = `.${path}.error`;
                    console.log(string, $(string));
                    $(string).text(error.msg);
                }
            }
            else{
                location.assign('/');
            }
            if (data.teacher) {
                console.log(data.teacher);
                location.assign('/');
            }
        }
        catch (err) {
            console.log(err);
        }
    });

    // home page
    $("#updateMobile").click( async function(e){
        e.preventDefault();
        const newMobile = $(".newMobile")[0].value;

        try {
            const res = await fetch('/teacher-info', { 
                method: 'PUT', 
                body: JSON.stringify({ newMobile }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                $('.mobile.error').text(data.errors.mobile);
            }
            if (data.teacher) {
                location.assign('/');
            }

        }
        catch (err) {
            console.log(err);
        }
        
    })

    $("#updateEmail").click( async function(e){
        e.preventDefault();
        const newEmail = $(".newEmail")[0].value;
        if(newEmail.trim().length == 0){
            $('.newEmail.error').text('Please enter the new email to update');
            return;
        }
        try {
            const res = await fetch('/teacher-info', { 
                method: 'PUT', 
                body: JSON.stringify({ newEmail }),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                $('.email.error').text(data.errors.email);
            }
            if (data.teacher) {
                location.assign('/');
            }

        }
        catch (err) {
            console.log(err);
        }
        
    })


    $("#updatePassword").click( async function(e){
        e.preventDefault();
        const newPassword = $(".newPassword").val();    
        const currentPassword = $(".password").val();
        const confirmPassword = $(".confirmPassword").val();

        $(".password.error").text('');
        $(".newPassword.error").text('');
        if(newPassword !== confirmPassword) {
            $('.newPassword.error').text('Passwords do not match');
            return;
        }
        
        if(newPassword.trim().length == 0){
            $('.newPassword.error').text('Please enter the new password to update');
            return;
        }
        const formData = {
            currentPassword: currentPassword,
            newPassword: newPassword
        }
        
        try {
            const res = await fetch('/teacher-info', { 
                method: 'PUT', 
                body: JSON.stringify(formData),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data);
            if (data.errors) {
                $('.password.error').text(data.errors.password);
            }
            if (data.teacher) {
                location.assign('/');
            }

        }
        catch (err) {
            console.log(err);
        }
        
    })
});