export default {
  methods: {
    capitalize(val : string){
            return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    },
    dateFormatter(val: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    const date = new Date(val);
    return date.toLocaleString("en-US", options).replace(" at ", " ");
}
  }
};
