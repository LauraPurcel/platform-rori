package com.firstproject.platform.DAO;

import java.util.UUID;

public interface PersonDAO {
    int insertPerson(UUID id, String firstName, String lastName);
    default int addPerson(UUID id, String firstName, String lastName) {
        //UUID id = UUID.randomUUID();
        return insertPerson(id, firstName, lastName);
    }

}
