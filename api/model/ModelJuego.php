<?php
  class ModelJuego{

    private $db;

    function __construct(){
      $this->db= $this->Connect();
    }

    function Connect(){
      return new PDO('mysql:host=localhost;'
    .'dbname=apuestas_db;charset=utf8'
    , 'root', '');
    }

    function getJuegos(){
      $a = $this->db->prepare("SELECT * FROM juego");
      $a->execute();
      return $a->fetchAll(PDO::FETCH_ASSOC);
    }

    function getJuego($id){
      $a = $this->db->prepare("SELECT * FROM juego WHERE id_juego=?");
      $a->execute(array($id));
      return $a->fetchAll(PDO::FETCH_ASSOC);
    }

  }


 ?>
