/* =====================================
   PERSONAL FINANCE TRACKER
   JAVASCRIPT FUNCTIONALITY
   ===================================== */


// Get stored data

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];



// Add Transaction Function

function addTransaction(type){


    let title = document.getElementById("title").value;

    let amount = Number(
        document.getElementById("amount").value
    );



    if(title === "" || amount === 0){

        alert("Please enter valid details");

        return;

    }



    let transaction = {

        id:Date.now(),

        title:title,

        amount:amount,

        type:type,

        date:new Date().toLocaleDateString()

    };



    transactions.push(transaction);



    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );



    alert(type + " Added Successfully");


    document.getElementById("title").value="";

    document.getElementById("amount").value="";



    updateDashboard();


}




// Calculate Income

function totalIncome(){


    return transactions

    .filter(item=>item.type==="Income")

    .reduce(

        (sum,item)=>sum+item.amount,

        0

    );

}




// Calculate Expense

function totalExpense(){


    return transactions

    .filter(item=>item.type==="Expense")

    .reduce(

        (sum,item)=>sum+item.amount,

        0

    );

}




// Calculate Balance

function totalBalance(){


    return totalIncome()-totalExpense();


}




// Update Dashboard

function updateDashboard(){



    let income=document.getElementById("income");


    let expense=document.getElementById("expense");


    let balance=document.getElementById("balance");



    if(income){

        income.innerHTML="₹ "+totalIncome();

    }



    if(expense){

        expense.innerHTML="₹ "+totalExpense();

    }



    if(balance){

        balance.innerHTML="₹ "+totalBalance();

    }



    displayTransactions();



}




// Display Transaction History

function displayTransactions(){



    let table=document.getElementById("transactionTable");



    if(!table){

        return;

    }



    table.innerHTML="";



    transactions.forEach(item=>{



        let row=`

        <tr>

        <td>${item.title}</td>


        <td>

        ₹${item.amount}

        </td>


        <td>

        ${item.type}

        </td>


        <td>

        ${item.date}

        </td>


        </tr>

        `;



        table.innerHTML += row;



    });



}




// Delete All Transactions

function clearData(){


    localStorage.removeItem("transactions");


    transactions=[];


    updateDashboard();


    alert("All Data Deleted");


}




// Load Data Automatically

window.onload=function(){


    updateDashboard();


};