export const useStudy = () => {
  const subjects = [
    { value: "Artes", label: "Artes" },
    { value: "Biologia", label: "Biologia" },
    { value: "Matemática", label: "Matemática" },
    { value: "Física", label: "Física" },
    { value: "Química", label: "Química" },
    { value: "Geografia", label: "Geografia" },
    { value: "Inglês", label: "Inglês" },
  ]

  const weekDays = [
    [
      { value: "0", label: "Domingo" },
      { value: "1", label: "Segunda-feira" },
      { value: "2", label: "Terça-feira" },
      { value: "3", label: "Quarta-feira" },
      { value: "4", label: "Quinta-feira" },
      { value: "5", label: "Sexta-feira" },
      { value: "6", label: "Sábado" },
    ]
  ]

  return {
    subjects,
    weekDays,
  }
}
