declare module 'react-native-calendar-picker' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle } from 'react-native'; // Importamos tipos de React Native

    // Definimos las propiedades posibles de CalendarPicker
    interface CalendarPickerProps {
        // Función que se ejecuta al cambiar la fecha
        onDateChange?: (date: Date) => void;
        // Fecha mínima seleccionable
        minDate?: Date;
        // Fecha máxima seleccionable
        maxDate?: Date;
        // Función para cuando cambia el mes
        onMonthChange?: (month: number, year: number) => void;
        // Función para cuando cambia el año
        onYearChange?: (year: number) => void;
        // Estilos personalizados para la vista principal del calendario
        style?: ViewStyle;
        // Estilo para el texto de los días
        dayTextStyle?: TextStyle;
        // Estilo para el texto del mes
        monthTitleStyle?: TextStyle;
        // Estilo para el texto del año
        yearTitleStyle?: TextStyle;
        // Estilo para la cabecera del calendario
        headerStyle?: ViewStyle;
        // Estilo para los días seleccionados
        selectedDayStyle?: ViewStyle;
        // Estilo para los días no seleccionables
        disabledDayStyle?: ViewStyle;
        // Activar o desactivar el selector de rango de fechas
        allowRangeSelection?: boolean;
        // Mostrar o no el selector de rango
        showDayStragglers?: boolean;
        // Mostrar los días de la semana de inicio a fin de la semana
        showWeekNumbers?: boolean;
        // Determinar si se debe seleccionar solo un día
        singleDatePicker?: boolean;
    }

    // La clase CalendarPicker hereda de Component y recibe las propiedades definidas arriba
    export default class CalendarPicker extends Component<CalendarPickerProps> { }
}
