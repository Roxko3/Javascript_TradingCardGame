<?php
include('db.php');

session_start();

if(isset($_SESSION['user_id'])){
    header("Location: index.php");
    exit();
}

$errors=[];

if($_SERVER['REQUEST_METHOD']=='POST'){
    $username=trim($_POST['username']);
    $password=trim($_POST['password']);


    $sql="SELECT * FROM users where username=?";
    $stmt=$pdo->prepare($sql);
    $stmt->execute([$username]);

    $user=$stmt->fetch();

    if($user&&password_verify($password, $user['password'])){
        $_SESSION['user_id']=$user["id"];
        header('Location: index.php');
        exit();
    } else {
        $errors['login']="Hibas felhasznalonev vagy jelszo!";
    }
}

?>

<!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trading Card Game</title>
    <link rel="stylesheet" href="style.css" defer/>
    <link
      href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap"
      rel="stylesheet"
      defer
    />
    <link rel="icon" type="image/x-icon" href="Final_images/icon.ico" />
</head>
<body>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <span style="background-color: rgba(255, 255, 255, 0.30); text-align: center; padding: 15px; border: 1px solid black; border-radius: 5px">
        <h1>Bejelentkezes</h1>
        <form action="login.php" method="post">
            <label for="username">Felhasznalonev</label><br/>
            <input type="text" name="username" id="username"/><br/>
            <label for="password">Jelszo</label><br/>
            <input type="password" name="password" id="password"/><br/>
            <?php if(isset($errors['login'])) : ?>
                <span style="color: red"><?= htmlspecialchars($errors['login'])?></span>
            <?php endif; ?>
            <br/>
            <button id="actionButton" type="submit">Belepes</button>
        </form>
        <br/>
        <a href="register.php">Regisztracio</a>
        </span>
    </div>
</body>
</html>
