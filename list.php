<?php



if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header($_SERVER['SERVER_PROTOCOL'] . "405 Method not allowed", true, 405);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

$file_name = "data.json";
$perso = [];
if (file_exists($file_name)) {
    //chargement de la liste a partir du fichier 
    $perso = json_decode(file_get_contents($file_name), true);
}
$json_text = json_encode($perso);
echo $json_text;
