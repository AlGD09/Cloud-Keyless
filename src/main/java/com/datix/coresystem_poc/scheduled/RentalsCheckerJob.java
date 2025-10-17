package com.datix.coresystem_poc.scheduled;

import com.datix.coresystem_poc.entity.RentedWallbox;
import com.datix.coresystem_poc.repository.RentedWallboxRepository;
import com.datix.coresystem_poc.service.SteveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class RentalsCheckerJob {

    @Autowired
    RentedWallboxRepository rentedWallboxRepository;

    @Autowired
    SteveService steveService;

    private static Set<RentedWallbox> activeRentals = new HashSet<>();

    @Scheduled(cron = "0 * * * * ?") // every minute at 0 seconds
    public void checkCurrentRentals() {
        LocalDateTime utcNow = LocalDateTime.now();
        List<RentedWallbox> rentedWallboxes = rentedWallboxRepository.findAll();

        System.out.println("Scheduled booking activating task running every minute - " + utcNow);
        checkRentalsToActivate(utcNow, rentedWallboxes);
        checkRentalsToDeactivate(utcNow);
        ;
    }

    private void checkRentalsToActivate(LocalDateTime utcNow, List<RentedWallbox> rentedWallboxes) {
        for (RentedWallbox rentedWallbox : rentedWallboxes) {
            if (rentedWallbox.getStartTime() != null && rentedWallbox.getEndTime() != null) {
                boolean isActive = !utcNow.isBefore(rentedWallbox.getStartTime()) && utcNow.isBefore(rentedWallbox.getEndTime());
                if (isActive && activeRentals.add(rentedWallbox)) {
                    steveService.turnOff(rentedWallbox.getWallbox().getPhysicalId());
                    System.out.println(
                            " Current time " + utcNow + "; Activating rental with ID " + rentedWallbox.getId() + " for wallbox "
                                    + rentedWallbox.getWallbox().getOwner().getName() + "-" + rentedWallbox.getWallbox().getName()
                                    + "; Active until " + rentedWallbox.getEndTime());
                }
            }
        }
    }

    private void checkRentalsToDeactivate(LocalDateTime utcNow) {
        if (!activeRentals.isEmpty()) {
            Set<RentedWallbox> toRemove = new HashSet<>();

            for (RentedWallbox activeRental : activeRentals) {
                if (activeRental.getEndTime() != null && utcNow.isAfter(activeRental.getEndTime())) {
                    toRemove.add(activeRental);
                    steveService.turnOn(activeRental.getWallbox().getPhysicalId());
                    System.out.println(" Current UTC time " + utcNow + "; Deactivating rental with ID " + activeRental.getId()
                    + " for wallbox " + activeRental.getWallbox().getOwner().getName() + "-" + activeRental.getWallbox().getName()
                    );
                }
            }

            activeRentals.removeAll(toRemove);
        }
    }
}

