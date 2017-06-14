
<?php
    require_once("connectDB.php");
    $query="SELECT * FROM bmidata";

    $result = $conn->query($query) or die($conn->error.__LINE__);

    // $arr = array();
    // if($result->num_rows > 0)
    // {
    //     while($row = $result->fetch_assoc())
    //     {
    //         $arr[] = $row;
    //     }
    // }
    // $json_response = json_encode($arr);

    // echo $json_response;	

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") 
	{
		$outp .= ",";
	}
    $outp .= '{"min":"'  . floatval ($rs["min"]) . '",';
    $outp .= '"max":"'  . floatval ($rs["max"]) . '",';
    $outp .= '"meaning":"'. 'คุณ'  . $rs["meaning"] . '",';
	$outp .= '"risk":"'  . $rs["risk"] . '"}';					
}
$outp ='['.$outp.']';
$conn->close();

echo($outp);

?>

