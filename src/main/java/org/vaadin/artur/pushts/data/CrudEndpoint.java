package org.vaadin.artur.pushts.data;

import java.util.List;
import java.util.Optional;

import com.vaadin.flow.server.connect.EndpointExposed;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

import org.springframework.data.domain.Page;
import org.vaadin.artur.helpers.CrudService;
import org.vaadin.artur.helpers.PagingUtil;

@AnonymousAllowed
@EndpointExposed
public abstract class CrudEndpoint<T, ID> {

    protected abstract CrudService<T, ID> getService();

    public List<T> list(int offset, int limit) {
        Page<T> page = getService().list(PagingUtil.offsetLimitToPageable(offset, limit));
        return page.getContent();
    }

    public Optional<T> get(ID id) {
        return getService().get(id);
    }

    public T update(T entity) {
        return getService().update(entity);
    }

    public void delete(ID id) {
        getService().delete(id);
    }

    public int count() {
        return getService().count();
    }

}