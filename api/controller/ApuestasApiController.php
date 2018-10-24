<?php


require_once "./model/ModelJuego.php";
require_once "./view/ViewJuego.php";
require_once "./model/ModelApuestas.php";
require_once "Api.php";

class ApuestasApiController extends Api{

  private $model;
  private $modelJuego;
  private $view;

  function __construct(){
    parent::__construct();
    $this->model = new ModelApuestas();
    $this->modelJuego = new ModelJuego();
    $this->view= new ViewJuego();
  }

  function Home(){
    $Apuestas = $this->model->getApuestas();
    $Juego = $this->modelJuego->getJuego();
    $this->view->MostrarJuego($Apuestas, $Juego);
  }

  function GetApuestas($param = null){

    if(isset($param)){
      $id_apuestas = $param[0];
      $data = $this->model->GetApuesta($id_apuestas);
    }else{
      $data = $this->model->GetApuestas();
    }
      if(isset($data)){
        return $this->json_response($data, 200);
      }else{
        return $this->json_response(null, 404);
      }
  }

}
 ?>
