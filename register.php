<?php
include('db.php');

session_start();

if(isset($_SESSION['user_id'])){
    header("Location: index.php");
    exit();
}

if($_SERVER['REQUEST_METHOD']=='POST'){
        $username=$_POST['username'];
        $password=password_hash($_POST['password'],PASSWORD_DEFAULT);
    
        $stmtUsername = $pdo->prepare("SELECT username FROM users WHERE username = ? LIMIT 1");
        $stmtUsername->execute([$username]);
        if($stmtUsername->rowCount() == 1){
            echo "Van mar ilyen nev";
        } else {
            $sql="INSERT INTO users (username, password, packs) VALUES (?,?,?)";
            $stmt=$pdo->prepare($sql);
            $stmt->execute([$username,$password,1]);
        
            $id = $pdo->lastInsertId();
            for ($i=0; $i < 20; $i++) { 
                $query="INSERT INTO cards_owned (user_id, card_id, owned) VALUES (?,?,?)";
                $stmtOwned=$pdo->prepare($query);
                $stmtOwned->execute([$id,$i+1,0]);
            }
            echo "Reg. done";
        }

}

?>

<form action="register.php" method="POST">
    <label for="username">Felhasznalonev</label>
    <input type="text" name="username" id="username"/>
    <label for="password">Jelszo</label>
    <input type="password" name="password" id="password"/>
    <button type="submit">Regisztracio</button>
</form>