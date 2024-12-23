<?php
include('db.php');

session_start();

if(isset($_SESSION['user_id'])){
    header("Location: index.php");
    exit();
}

$errors = [];
$successMessage = "";

if($_SERVER['REQUEST_METHOD']=='POST'){
        $username=trim($_POST['username']);
        $passwordRaw = trim($_POST['password']);
        $password=password_hash($passwordRaw,PASSWORD_DEFAULT);
    
        $stmtUsername = $pdo->prepare("SELECT username FROM users WHERE username = ? LIMIT 1");
        $stmtUsername->execute([$username]);
        if(empty($username)){
            $errors['username'] = "Kotelezo felhasznalonevet megadni!";
        }
        if($stmtUsername->rowCount() == 1){
            $errors['taken'] = "Letezik felhasznalo a megadott nevvel!";
        } 
        if(empty($passwordRaw)){
            $errors['password'] = "Kotelezo jelszot megadni!";
        }
        if(empty($errors)) {
            $sql="INSERT INTO users (username, password, packs) VALUES (?,?,?)";
            $stmt=$pdo->prepare($sql);
            $stmt->execute([$username,$password,1]);
        
            $id = $pdo->lastInsertId();
            for ($i=0; $i < 20; $i++) { 
                $query="INSERT INTO cards_owned (user_id, card_id, owned) VALUES (?,?,?)";
                $stmtOwned=$pdo->prepare($query);
                $stmtOwned->execute([$id,$i+1,0]);
            }
            $successMessage = "Sikeres regisztracio";
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
        <h1>Regisztracio</h1>
        <form action="register.php" method="POST">
            <label for="username">Felhasznalonev</label><br/>
            <input type="text" name="username" id="username"/><br/>
            <?php if(isset($errors['username'])) : ?>
                <span style="color: red"><?= htmlspecialchars($errors['username'])?></span><br/>
            <?php endif; ?>
            <?php if(isset($errors['taken'])) : ?>
                <span style="color: red"><?= htmlspecialchars($errors['taken'])?></span><br/>
            <?php endif; ?>
            <label for="password">Jelszo</label><br/>
            <input type="password" name="password" id="password"/><br/>
            <?php if(isset($errors['password'])) : ?>
                <span style="color: red"><?= htmlspecialchars($errors['password'])?></span>
            <?php endif; ?>
            <?php if(!empty($successMessage)) :?>
                <span style="color: lime"><?= htmlspecialchars($successMessage) ?></span>
            <?php endif; ?>
            <br/>
            <button id="actionButton" type="submit">Regisztralas</button>
        </form>
        <br/>
        <a href="login.php">Bejelentkezes</a>
        </span>
    </div>
</body>
</html>

