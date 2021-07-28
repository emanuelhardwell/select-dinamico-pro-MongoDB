import React, { useState } from "react";
import Swal from "sweetalert2";

const informacion = [
  {
    unidad: "pza",
    _id: "6100868ed07d3c0674cf4c97",
    nombre: "suministro y colocacion de letrero",
    precioUnitario: 3500,
    clave: {
      _id: "61007cf0f183f249600998a7",
      nombre: "preliminares",
    },
    __v: 0,
  },
  {
    unidad: "m2",
    _id: "610086acd07d3c0674cf4c98",
    nombre: "trazo y nivelacion de terreno en estructuras",
    precioUnitario: 9,
    clave: {
      _id: "61007cf0f183f249600998a7",
      nombre: "preliminares",
    },
    __v: 0,
  },
  {
    unidad: "m3",
    _id: "6100880bd07d3c0674cf4c9a",
    nombre: "excavacion a cielo abierto",
    precioUnitario: 212,
    clave: {
      _id: "61007cfff183f249600998a8",
      nombre: "cimentacion",
    },
    __v: 0,
  },
  {
    unidad: "m3",
    _id: "6100881fd07d3c0674cf4c9b",
    nombre: "retiro de material de excavacion",
    precioUnitario: 296,
    clave: {
      _id: "61007cfff183f249600998a8",
      nombre: "cimentacion",
    },
    __v: 0,
  },
  {
    unidad: "ml",
    _id: "610089deae132143c8575e05",
    nombre: "castillo k armado con 4 varillas",
    precioUnitario: 292,
    clave: {
      _id: "610087a1d07d3c0674cf4c99",
      nombre: "estructura primer nivel",
    },
    __v: 0,
  },
];

export const ClavesConcepto = () => {
  let initialState = {
    clave: "",
    conceptoNombre: "",
    unidad: "",
    cantidad: "",
    total: "",
    concepto: "",
  };

  const [arrayClaves, setArrayClaves] = useState([]);
  const [arrayConceptos, setArrayConceptos] = useState([]);
  const [presupuestos, setPresupuestos] = useState(initialState);

  let { clave, conceptoNombre, unidad, cantidad, total, concepto } =
    presupuestos;

  const handleCargarProductos = (e) => {
    const opcion = e.target.value;

    setPresupuestos({
      ...presupuestos,
      conceptoNombre: "",
      cantidad: "",
      total: "",
      unidad: "",
      concepto: "",
    });

    const names = informacion.map((item) => item.clave.nombre);
    console.log(names);
    let myArray = [...new Set(names)];
    setArrayClaves(myArray);
    // console.log(myArray);

    const resultado = informacion.filter(
      (item) => item.clave.nombre === opcion
    );
    if (resultado !== undefined) {
      setArrayConceptos(resultado);
    }
  };

  const handleCargarTotal = (e) => {
    let cantidad = e.target.value;
    let conceptoFinal = conceptoNombre;

    const resultado = arrayConceptos.find(
      (item) => item.nombre === conceptoFinal || item.nombre === "otro"
    );
    // console.log(resultado);
    let res = resultado.precioUnitario * cantidad;
    let unidadFinal = resultado.unidad;
    let conceptoId = resultado._id;

    // console.log(unidadFinal);
    setPresupuestos({
      ...presupuestos,
      cantidad: cantidad,
      total: res,
      unidad: unidadFinal,
      concepto: conceptoId,
    });
  };

  // metodo que espera el cambio del SELECT de los conceptos
  const handleVerificarConcepto = (e) => {
    setPresupuestos({
      ...presupuestos,
      cantidad: "",
      total: "",
      unidad: "",
      concepto: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPresupuestos({ ...presupuestos, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (
      clave === "" ||
      conceptoNombre === "" ||
      concepto === "" ||
      unidad === "" ||
      cantidad === ""
    ) {
      return Swal.fire("Error", "Selecciona una clave y concepto", "error");
    }
    console.log(presupuestos);
  };

  // return ********************************
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmitForm}>
                <div className="form-floating mb-2">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    name="clave"
                    value={clave}
                    onChange={handleInputChange}
                    onClick={handleCargarProductos}
                  >
                    <option value=""> Selecciona tu clave </option>
                    {arrayClaves.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect">
                    <p className="fw-bold"> Claves </p>
                  </label>
                </div>

                <div className="form-floating mb-2">
                  <select
                    className="form-select"
                    id="floatingSelect2"
                    aria-label="Floating label select example"
                    name="conceptoNombre"
                    value={conceptoNombre}
                    onChange={handleInputChange}
                    onClick={handleVerificarConcepto}
                  >
                    <option value=""> Selecciona tu concepto </option>
                    {arrayConceptos.map((item, i) => (
                      <option key={i} value={item.nombre}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect2">
                    <p className="fw-bold"> Conceptos </p>
                  </label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    disabled={conceptoNombre === "" ? true : false}
                    type="number"
                    className="form-control"
                    id="floatingInput9"
                    placeholder="a"
                    name="cantidad"
                    value={cantidad}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleCargarTotal(e);
                    }}
                  />
                  <label htmlFor="floatingInput9"> Cantidad </label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    disabled={true}
                    type="number"
                    className="form-control"
                    id="floatingInput1"
                    placeholder="a"
                    name="total"
                    value={total}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="floatingInput1"> Total </label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    id="floatingInput4"
                    placeholder="a"
                    name="unidad"
                    value={unidad}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="floatingInput4"> Unidad </label>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="far fa-save me-2"></i>
                    <span> Agregar </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* col-md-6 */}
        <div className="col-md-6">
          <h3> hola menu </h3>
        </div>
      </div>
    </>
  );
};
