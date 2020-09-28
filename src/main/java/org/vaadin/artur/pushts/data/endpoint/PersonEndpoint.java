package org.vaadin.artur.pushts.data.endpoint;


import org.vaadin.artur.pushts.data.CrudEndpoint;
import org.vaadin.artur.pushts.data.entity.Person;
import org.vaadin.artur.pushts.data.service.PersonService;
import com.vaadin.flow.server.connect.Endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;
import javax.annotation.Nullable;

@Endpoint
public class PersonEndpoint extends CrudEndpoint<Person, Integer> {

    private PersonService service;

    public PersonEndpoint(@Autowired PersonService service) {
        this.service = service;
    }

    @Override
    protected PersonService getService() {
        return service;
    }

}
