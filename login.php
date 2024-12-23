<?php
include('db.php');

session_start();

if(isset($_SESSION['user_id'])){
    header("Location: index.php");
    exit();
}

if($_SERVER['REQUEST_METHOD']=='POST'){
    $username=$_POST['username'];
    $password=$_POST['password'];

    $sql="SELECT * FROM users where username=?";
    $stmt=$pdo->prepare($sql);
    $stmt->execute([$username]);

    $user=$stmt->fetch();

    if($user&&password_verify($password, $user['password'])){
        $_SESSION["user_id"]=$user["id"];
        header('Location: index.php');
        exit();
    } else {
        echo "Invalid username or password";
    }
}

?>

<form action="login.php" method="post">
    Nev: <input type="text" name="username" id="username"/>
    Jelszo: <input type="password" name="password" id="password"/>
    <button type="submit">Belepes</button>
</form>