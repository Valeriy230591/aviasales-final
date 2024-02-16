import React from "react";
import Ticket from "../Ticket";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchId,
  fetchTickets,
} from "../../redux/serverActions/serverActions";
import styles from "./TicketsList.module.scss";

const TicketsList = () => {
  const [visibleTickets, setVisibleTickets] = useState(5);
  const { id, tickets, isLoading, errorMessage } = useSelector(
    (state) => state.tickets,
  );
  const tabs = useSelector((state) => state.tabs.tabs);
  const filters = useSelector((state) => state.filters.filters);
  const dispatch = useDispatch();
  const activeFilterCount = filters.filter((item) => item.active).length;

  const sortTicketsByFilter = useMemo(() => {
    return (arr) => {
      const activeFilters = {};
      filters.forEach((item) => {
        activeFilters[item.name] = item.active;
      });

      const filteredArr = arr.filter((item) => {
        const ticketStops1 = item.segments[0].stops.length;
        const ticketStops2 = item.segments[1].stops.length;
        if (Object.values(activeFilters).every((filter) => !filter)) {
        }

        if (
          (activeFilters["not"] && ticketStops1 === 0) ||
          (activeFilters["not"] && ticketStops2 === 0) ||
          (activeFilters["not"] && ticketStops1 === 0 && ticketStops2 === 0)
        ) {
          return true;
        }
        if (
          (activeFilters["one"] && ticketStops1 === 1) ||
          (activeFilters["one"] && ticketStops2 === 1) ||
          (activeFilters["one"] && ticketStops1 === 1 && ticketStops2 === 1)
        ) {
          return true;
        }
        if (
          (activeFilters["two"] && ticketStops1 === 2) ||
          (activeFilters["two"] && ticketStops2 === 2) ||
          (activeFilters["two"] && ticketStops1 === 2 && ticketStops2 === 2)
        ) {
          return true;
        }
        if (
          (activeFilters["three"] && ticketStops1 === 3) ||
          (activeFilters["three"] && ticketStops2 === 3) ||
          (activeFilters["three"] && ticketStops1 === 3 && ticketStops2 === 3)
        ) {
          return true;
        }
        return false;
      });
      return filteredArr;
    };
  }, [filters]);

  const filteredArr = sortTicketsByFilter(tickets);

  const sortTab = (arr) => {
    const activeTab = tabs.find((item) => item.active);
    switch (activeTab.name) {
      case "cheapest":
        return arr.sort((a, b) => a.price - b.price);
      case "fastest":
        return arr.sort(
          (a, b) =>
            Math.floor(a.segments[0].duration + a.segments[1].duration) -
            Math.floor(b.segments[0].duration + b.segments[1].duration),
        );
      case "optimal":
        return arr;
      default:
        return [];
    }
  };

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchTickets(id));
    }
  }, [dispatch, id]);

  return (
    <ul className={styles.tickets}>
      {errorMessage ? <Error errorMessage={errorMessage} /> : null}
      {!activeFilterCount ? (
        <div className={styles.title}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </div>
      ) : null}
      {isLoading ? <Loader /> : null}
      {!errorMessage &&
        sortTab(filteredArr)
          .slice(0, visibleTickets)
          .map((ticket, i) => (
            <Ticket
              key={i}
              carrier={ticket.carrier}
              segments={ticket.segments}
              price={ticket.price}
            />
          ))}

      {activeFilterCount ? (
        <button
          className={styles.button}
          onClick={() => setVisibleTickets((prev) => prev + 5)}
        >
          Показать еще 5 билетов!
        </button>
      ) : null}
    </ul>
  );
};
export default TicketsList;
