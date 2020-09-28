package org.vaadin.artur.pushts;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;

/**
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 */
@PWA(name = "Push TS", shortName = "push--tS")
public class AppShell implements AppShellConfigurator {
}
