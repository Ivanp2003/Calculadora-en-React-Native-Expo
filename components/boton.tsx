import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";

import * as Haptics from 'expo-haptics';// Importa el módulo de vibración de Expo para proporcionar retroalimentación táctil al presionar los botones

type AccionarBotonProps = {
    label: string;// Texto que se mostrará en el botón
    onPress?: (event: GestureResponderEvent) => void;// Función que se ejecutará al presionar el botón
    color?: string;// Color de fondo del botón, por defecto es '#2D2D2D'
    wide?: boolean;// Si es true, el botón ocupará el doble de ancho (para el botón "0")
    textColor?: string;// Color del texto del botón, por defecto es '#FFFFFF'
};

const AccionarBoton: React.FC<AccionarBotonProps> = ({
  label,
  onPress,
  color = "#2D2D2D",
  wide = false,
  textColor = "#FFFFFF",
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color },
        wide && styles.wideButton,
      ]}
      onPress={() => {
        Haptics.selectionAsync(); // vibración
        onPress?.();              // ejecutar acción real
      }}
    >
      <Text style={[styles.text, { color: textColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,            // ancho estándar de los botones
    height: 70,           // altura para que sea círculo
    borderRadius: 35,     // mitad del tamaño para que quede redondo
    margin: 6,            // separación entre botones
    justifyContent: 'center',
    alignItems: 'center',
  },
  wideButton:{
    width: 150,           // ancho para el botón "0"
    alignItems: "center", // Alinea el texto al centro del botón ancho
    justifyContent: "center", // Centra el contenido verticalmente
  },
  text: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '400',
  },
});

export default AccionarBoton;