package org.vaadin.artur.pushts.views.dashboard;

/**
 * Simple DTO class for chart data-series.
 */
public class ChartSeries {

    private String name;
    private double[] data;

    public ChartSeries(String name, double... data) {
        this.name = name;
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public double[] getData() {
        return data;
    }
}
