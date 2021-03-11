<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("HTTP/1.1 200 OK");
header("Access-Control-Allow-Headers: *");


include_once 'config/database.php';
include_once 'objects/user.php';


$database = new Database();
$db = $database->getConnection();


$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->firstname = $data->firstname;
$user->lastname = $data->lastname;
$user->email = $data->email;
$user->password = $data->password;


if (
    !empty($user->firstname) &&
    !empty($user->email) &&
    !empty($user->password) &&
    $user->create()
) {

    http_response_code(200);

    echo json_encode(array("message" => "User was added."));
}

else {

    http_response_code(400);

    echo json_encode(array("message" => "Hui sosi."));
}