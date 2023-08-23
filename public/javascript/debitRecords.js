$(document).ready(function(){
    var myTimeOut;

    $(".addDebitTransaction").submit( async function(e){

        e.preventDefault();

        const form = document.querySelector('form');
        const record = {
            date: form.date.value + `T00:00:00.000Z`,
            expenditureType: form.expenditureType.value,
            otherExpenditureType: form.otherExpenditureType.value,
            amount: form.amount.value,
            remarks: form.remarks.value
        };
        console.log(record);
        try {
            const response = await fetch('/debit/postDebitTransaction',{
                method: 'POST',
                body: JSON.stringify(record),
                headers: {'Content-Type': 'application/json'} 
            });

            const result = await response.json();

            console.log(result);

            if (result.errors) {
                let errString = '';
                for (error of result.errors){
                    errString = errString + error.msg + ', ';
                }

                errString = errString.substring(0, errString.length - 2);

                $('.acknowledgement').addClass("alert-danger").html(errString);
                clearTimeout(myTimeOut);
                setTimeout(()=>{
                    $('.acknowledgement').html('');
                },3000);
            }
            else if(result.messages){
                alert(result.messages);
                location.assign('/debit');
            }
        } catch (err) {
            console.log(err);
        }
    });


    $(".getDebitTransactions").submit( async function(e){
        alert("hi");
        e.preventDefault();
        const form = document.querySelector('form');
        const record = {
            fromDate: form.fromDate.value ? form.fromDate.value + `T00:00:00.000Z` : '',
            toDate: form.toDate.value ? form.toDate.value + `T00:00:00.000Z` : '',
            expenditureType: form.expenditureType.value,
            otherExpenditureType: form.otherExpenditureType.value,
            amount: form.amount.value,
            remarks: form.remarks.value
        };

        console.log(record);

        try {
            const response = await fetch('/debit/getDebitRecords',{
                method: 'POST',
                body: JSON.stringify(record),
                headers: {'Content-Type': 'application/json'} 
            });

            const result = await response.json();

            console.log(result);

            if (result.errors) {
                let errString = '';
                for (error of result.errors){
                    errString = errString + error.msg + ', ';
                }

                errString = errString.substring(0, errString.length - 2);

                $('.acknowledgement').addClass("alert-danger").html(errString);
                clearTimeout(myTimeOut);
                setTimeout(()=>{
                    $('.acknowledgement').html('');
                },3000);
            }
            else if(result.records){
                console.log(result);
                addRecord(result.records);
            }
        } catch (err) {
            console.log(err);
        }
    });

})


function addRecord(records){
    var sNo = 1;
    var sum = 0;

    $(".debit-records-table-body").html('');

    records.forEach(record => {
        sum += record.amount;
        $(".debit-records-table-body").append(`
        <tr>
            <td>${sNo++}</td>
            <td>${record.date}</td>
            <td>${record.expenditureType}</td>
            <td>${record.otherExpenditureType}</td>
            <td>${record.remarks}</td>
            <td>${record.amount}</td>
        </tr>
        `);
    });


    $(".debit-records-table-body").append(`
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total</td>
            <td class="totalAmount">${sum}</td>
        </tr>
    `);
}