<?php
require_once("DB.php");
$db = new DB('193.190.58.30','snuffelpaal','snuffelpaal');
if ($_SERVER['REQUEST_METHOD'] == "GET") {
        echo json_encode($db->query("SELECT * FROM users"));
} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
        echo "POST";
} else {
        http_response_code(405);
}
?>