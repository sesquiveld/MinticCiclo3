package com.ciclo3.g9.ciclo3.repository.crud;

import com.ciclo3.g9.ciclo3.model.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ReservationCrudRepository extends CrudRepository<Reservation,Integer> {

    @Query("Select c.client, count(c.client) from Reservation as c" +
            " group by c.client order by count (c.client) desc")
    public List<Object[]> countTotalReservationsByClient();
    // SELECT * FROM Reservacion WHERE idReservation BETWEEN 10 and 20;
    // public List<Reservation> findAllByReservationsBetweenAnd(int valorA, int ValorB);
    // SELECT * FROM Reservation WHERE startDate AFTER fecha1 AND devolutionDate BEFORE fecha2;
    List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date dateOne, Date datetwo);
    // SELECT * FROM Reservation WHERE status = variable;
    public List<Reservation> findAllByStatus(String status);

}
