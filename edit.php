<?php

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
$inputJSON = file_get_contents('php://input');
// if (!$inputJSON['id'] == "" || !$inputJSON['name'] == "" || !$inputJSON['house'] == "" || !$inputJSON['imageSrc'] = "") {
//     header($_SERVER["SERVER_PROTOCOL"] . " 204 No Content", true, 204);
//     exit;
// }
$decodedJSON = json_decode($inputJSON, true);

$file_name = "data.json";
$persos = [];

$modifPerso =  [];
if (file_exists($file_name)) {
    $persos = json_decode(file_get_contents($file_name), true);


    foreach ($persos as $data) {
        if ($decodedJSON["id"] == $data["id"]) {
            array_push($modifPerso, $decodedJSON);
        } else {
            array_push($modifPerso, $data);
        }
    }
}

file_put_contents($file_name, json_encode(array_values($modifPerso)));
