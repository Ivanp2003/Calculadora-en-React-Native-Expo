import { Colors } from "@/constants/theme";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AccionarBoton from "@/components/boton";// Importa el componente creado para los botones


const RootLayout = () => {
  const [input, setInput] = React.useState(""); // Estado para almacenar la entrada del usuario
  const [result, setResult] = React.useState(""); // Estado para almacenar el resultado de la operación

  // Convertir símbolos UI a operación real
  const mapOperator = (value: string) => {
    switch (value) {
      case "×":
        return "*";
      case "÷":
        return "/";
      default:
        return value;
    }
  };

  //Calcular el resultado de la operación ingresada
   const calcularResultado = () => {
    try {
      const tokens = input.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);// Expresión regular para extraer números y operadores

      if (!tokens) return;

      let total = parseFloat(tokens[0]);

      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const number = parseFloat(tokens[i + 1]);

        switch (operator) {
          case "+":
            total += number;
            break;
          case "-":
            total -= number;
            break;
          case "*":
            total *= number;
            break;
          case "/":
            total /= number;
            break;
        }
      }

      setResult(String(total));
    } catch {
      setResult("Error");
    }
  };

// lógica de botones
  const handlePress = (value: string) => {
    // limpiar
    if (value === "C") {
      setInput("");
      setResult("0");
      return;
    }

    // igual
    if (value === "=") {
      calcularResultado();
      return;
    }

const mappedValue = mapOperator(value);
    setInput((prev) => prev + mappedValue);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.input}>{input || "0"}</Text>
      <Text style={styles.header}>{result}</Text>

      {/* FILA 1 */}
      <View style={styles.row}>
        <AccionarBoton label="C" color="#9B9B9B" textColor="#000000" onPress={() => handlePress("C")}/> 
        <AccionarBoton label="+/-" color="#9B9B9B"  textColor="#000000" onPress={() => handlePress("+/-")}/>
        <AccionarBoton label="del" color="#9B9B9B" textColor="#000000" onPress={() => handlePress("del")}/>
        <AccionarBoton label="÷" color="#FF9427" onPress={() => handlePress("÷")}/>
      </View>

      {/* FILA 2 */}
      <View style={styles.row}>
        <AccionarBoton label="7" onPress={() => handlePress("7")}/>
        <AccionarBoton label="8" onPress={() => handlePress("8")}/>
        <AccionarBoton label="9" onPress={() => handlePress("9")}/>
        <AccionarBoton label="×" color="#FF9427" onPress={() => handlePress("×")}/>
      </View>

      {/* FILA 3 */}
      <View style={styles.row}>
        <AccionarBoton label="4" onPress={() => handlePress("4")}/>
        <AccionarBoton label="5" onPress={()=> handlePress("5")}/>
        <AccionarBoton label="6" onPress={() => handlePress("6")}/>
        <AccionarBoton label="-" color="#FF9427" onPress={() => handlePress("-")}/>
      </View>

      {/* FILA 4 */}
      <View style={styles.row}>
        <AccionarBoton label="1" onPress={() => handlePress("1")}/>
        <AccionarBoton label="2" onPress={() => handlePress("2")}/>
        <AccionarBoton label="3" onPress={() => handlePress("3")}/>
        <AccionarBoton label="+" color="#FF9427" onPress={() => handlePress("+")}/>
      </View>

      {/* FILA 5 */}
      <View style={styles.row}>
        <AccionarBoton label="0" wide onPress={() => handlePress("0")}/>
        <AccionarBoton label="." onPress={() => handlePress(".")}/>
        <AccionarBoton label="=" color="#FF9427" onPress={() => handlePress("=")}/>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input:{
    color: "#FFFFFF",
    textAlign:"right",
    width: "100%",
    fontSize: 60,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  header: {
    color:"#666666",
    fontSize: 36,
    textAlign: "right",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 40,
  }
});