export function useContentSelectCell(page: "orders" | "parties") {
  switch (page) {
    case "orders":
      return {
        statusContent: [
          { text: "в обработке", backgroundColor: "bg-[#5685DE]", id: 1 },
          { text: "доставлен", backgroundColor: "bg-[#56DE85]", id: 2 },
          { text: "возврат", backgroundColor: "bg-[#D6A0A0]", id: 3 },
        ],
        tagContent: [
          { text: "бартер", backgroundColor: "bg-[#5685DE]", id: 1 },
          { text: "нет", backgroundColor: "bg-[#D6A0A0]", id: 2 },
        ],
      };
    case "parties":
      return {
        statusContent: [
          { text: "на складе", backgroundColor: "bg-[#5685DE]", id: 1 },
          { text: "оплачено", backgroundColor: "bg-[#56DE85]", id: 2 },
          { text: "не заказано", backgroundColor: "bg-[#D6A0A0]", id: 3 },
        ],
        tagContent: [
          { text: "бартер", backgroundColor: "bg-[#5685DE]", id: 1 },
          { text: "нет", backgroundColor: "bg-[#D6A0A0]", id: 2 },
        ],
      };
  }
}
