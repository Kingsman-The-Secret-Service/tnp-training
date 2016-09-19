<?php

//$config = require_once();


//Implement namespace
namespace cctns;

//create new config file (with ext4ension .ini)

class PDO extends PDO{
	

}

class DataApi {
	
	private $pdo;

	public function __construct($pdo, $job = "get_victims" , $id = NULL){

	$this->pdo = $pdo;

	//Switch Case for JOB

	//USE try{} catch(){}

	if($job == "edit_victim"){

		$data = $this->editVictim($id);
	}


	return json_encode($data);

	}

	public function listVictim(){

		print $this->pdo;

		//return $data[] = $mysqlData, Message & result
	}

	public function getVictim($id){

	}

	public function addVictim(){


	}

	public function editVictim($id){

	}

	public function trashVictim($id){


	}


}


$pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

$api = new DataApi($pdo, $_GET['job'], $_GET['id']);

echo $api;