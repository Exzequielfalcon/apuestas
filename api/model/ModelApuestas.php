<?php
  class ModelApuestas{

    private $db;

    function __construct(){
      $this->db= $this->Connect();
    }

    function Connect(){
      return new PDO('mysql:host=localhost;'
    .'dbname=apuestas_db;charset=utf8'
    , 'root', '');
    }

    function getApuestas(){
      $a = $this->db->prepare("SELECT * FROM apuesta");
      $a->execute();
      return $a->fetchAll(PDO::FETCH_ASSOC);
    }

    function getApuesta($id){
      $a = $this->db->prepare("SELECT * FROM apuesta WHERE id_apuesta=?");
      $a->execute(array($id));
      return $a->fetchAll(PDO::FETCH_ASSOC);
    }

  }


 ?>
