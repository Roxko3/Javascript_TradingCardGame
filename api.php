<?php
header("Content-Type: application/json");
include('db.php');
session_start();
$userID = $_SESSION['user_id'];
if(!isset($userID)){
    echo "Session error";
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
$resource = isset($requestUri[2]) ? $requestUri[2] : null;

$input = json_decode(file_get_contents('php://input'), true);

switch($method){
    case 'GET':
        if($resource === 'enemies'){
            getEnemies($pdo);
        }
        if($resource === 'cards'){
            getCards($pdo, $userID);
        }
        break;
    case 'PUT':
        if($resource === 'packs'){
            updatePacks($pdo, $userID, $input);
        }
        if($resource === 'cards'){
            updateCards($pdo, $userID, $input);
        }
        break;
    default:
        echo json_encode(['message' => 'Invalid request method']);
        break;
}

function getEnemies($pdo){
    $sql = "SELECT * FROM enemies";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}

function getCards($pdo, $userID){
    $sql="SELECT c.id as id, c.image as image, c.name as name, c.atk as atk, c.hp as hp, o.owned as owned FROM cards AS c JOIN cards_owned AS o ON c.id = o.card_id WHERE o.user_id = $userID;";
    $stmt=$pdo->prepare($sql);
    $stmt->execute();
    $result=$stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}

function updatePacks($pdo,$userID,$input){
    $sql = "UPDATE users SET packs = packs + :packs WHERE id = $userID;";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['packs' => $input['packs']]);
    $sqlPackNumber = "SELECT packs FROM users WHERE id = $userID";
    $stmtpackNumber = $pdo->prepare($sqlPackNumber);
    $stmtpackNumber->execute();
    $packNumber = $stmtpackNumber->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($packNumber);
}

function updateCards($pdo, $userID, $input){
    foreach($input['ids'] as $id){
        $sql = "UPDATE cards_owned SET owned = 1 WHERE user_id = $userID AND card_id = $id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    }
}
?>