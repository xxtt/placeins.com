<?php
require_once __DIR__ . '/config.php';

$response = array();

$sql = "SELECT * FROM marker ORDER BY category";
$result = mysqli_query($connection, $sql);

if ($result->num_rows > 0) {
    $response["success"] = 1;
    $response["markers"] = array();
    while ($row = mysqli_fetch_array($result)) {
       
		$columns=array("id","title","about_ua","about_us","about_ru","x","y","yt","category","address_ua","address_us","address_ru","phone","link","news_ua","news_us","news_ru","parking","baby","music","smoking","bill",);
		$marker = array();
 
		$arrlength=count($columns);

for($x=0;$x<$arrlength;$x++) {
  $marker["$columns[$x]"] =  htmlspecialchars_decode($row["$columns[$x]"]);
}
		
        array_push($response["markers"], $marker);
    }
} else {
    $response["success"] = 0;
    $response["message"] = "no data available";
}
echo json_encode($response, JSON_UNESCAPED_UNICODE);
mysqli_free_result($result);
mysqli_close($connection);