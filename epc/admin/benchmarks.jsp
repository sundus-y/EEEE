<%@ page import="au.com.infomedia.epc.presentation.MicrocatPresenter.data.catalog.ClientCatalogWithSections" %>
<%@ page import="au.com.infomedia.epc.presentation.MicrocatPresenter.data.catalog.CompactClientCatalog" %>
<%@ page import="au.com.infomedia.epc.presentation.MicrocatPresenter.data.section.ClientSectionData" %>
<%@ page import="au.com.infomedia.epc.presentation.MicrocatPresenter.data.section.ClientSectionPartsContainer" %>
<%@ page import="au.com.infomedia.epc.router.CatalogServiceRouter" %>
<%@ page import="org.apache.commons.collections.CollectionUtils" %>

<%!

    boolean isEnabled = false; // Change this setting to enable the benchmarks jsp

    long time = System.currentTimeMillis();
    long count1 = 0;
    long time1 = 0;
    long count2 = 0;
    long time2 = 0;
    long count3 = 0;
    long time3 = 0;
    long worstTime1 = 0;
    String worstCatalogueCode1 = "";
    long worstTime2 = 0;
    String worstCatalogueCode2 = "";
    long worstTime3 = 0;
    String worstSectionCode = "";

    public void benchmarks() {
        CatalogServiceRouter router = new CatalogServiceRouter();
        for (CompactClientCatalog compactClientCatalog : router.getCatalogsList().getCatalogs()) {
            final String catalogCode = compactClientCatalog.getData();
            System.out.println("---> Catalog: " + catalogCode + " - " + compactClientCatalog.getLabel());

            long t1 = System.currentTimeMillis();
            router.getAttributes(catalogCode, "");
            long t2 = System.currentTimeMillis();
            if (worstTime1 > 0) {
                count1++;
                time1 = time1 + (t2 - t1);

                if (t2 - t1 > worstTime1) {
                    worstTime1 = t2 - t1;
                    worstCatalogueCode1 = catalogCode;
                }
            } else {
                // ignore the first
                worstTime1 = 1;
            }
            System.err.println("     getAttributes: " + (t2 - t1));

            long t3 = System.currentTimeMillis();
            ClientCatalogWithSections catalogWithSections = router.getSectionHierarchy(catalogCode, "", false);
            long t4 = System.currentTimeMillis();
            if (worstTime2 > 0) {
                count2++;
                time2 = time2 + (t4 - t3);

                if (t4 - t3 > worstTime2) {
                    worstTime2 = t4 - t3;
                    worstCatalogueCode2 = catalogCode;
                }

            } else {
                // ignore the first
                worstTime2 = 1;
            }

            System.err.println("     getSectionHierarchy: " + (t4 - t3));

            for (ClientSectionData clientSectionData : catalogWithSections.getSections()) {
                benchmarks(router, catalogCode, clientSectionData);
            }
        }
    }

    private void benchmarks(CatalogServiceRouter router, String catalogCode, ClientSectionData clientSectionData) {
        if (CollectionUtils.isEmpty(clientSectionData.getSections())) {
            final String sectionCode = clientSectionData.getData();
            System.out.println("    ---> Section: " + sectionCode + " - " + clientSectionData.getLabel());

            long t5 = System.currentTimeMillis();
            ClientSectionPartsContainer clientSectionPartsContainer = router.getSectionParts(catalogCode, sectionCode, "");
            long t6 = System.currentTimeMillis();
            if (worstTime3 > 0) {
                count3++;
                time3 = time3 + (t6 - t5);

                if (t6 - t5 > worstTime3) {
                    worstTime3 = t6 - t5;
                    worstSectionCode = sectionCode;
                }
            } else {
                // ignore the first
                worstTime3 = 1;
            }

            System.err.println("         getSectionParts: " + (t6 - t5) + " for " + clientSectionPartsContainer.getCatalogs().get(0).getParts().size() + " parts");

            stats();

        } else {
            for (ClientSectionData innerClientSectionData : clientSectionData.getSections()) {
                benchmarks(router, catalogCode, innerClientSectionData);
            }

        }
    }

    // print statistics every 30 seconds
    private void stats() {
        if (System.currentTimeMillis() - time > 30000) {
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                // ignore
            }
            System.out.println("+------------------------------------------------------------------------");
            System.out.println("| ");
            if (count1 > 0) {
                System.out.println("| getAttributes       average: " + (time1 / count1) + " (" + count1 + " invocations)");
                System.out.println("| getAttributes          worst: " + worstTime1 + " (" + worstCatalogueCode1 + ")");
                System.out.println("| ");
            }
            if (count2 > 0) {
                System.out.println("| getSectionHierarchy average: " + (time2 / count2) + " (" + count2 + " invocations)");
                System.out.println("| getSectionHierarchy   worst: " + worstTime2 + " (" + worstCatalogueCode2 + ")");
                System.out.println("| ");
            }
            if (count3 > 0) {
                System.out.println("| getSectionParts     average: " + (time3 / count3) + " (" + count3 + " invocations)");
                System.out.println("| getSectionParts       worst: " + worstTime3 + " (" + worstSectionCode + ")");
                System.out.println("| ");
            }
            System.out.println("+------------------------------------------------------------------------");
            time = System.currentTimeMillis();
        }
    }


%>

<%

    if (isEnabled) {
        benchmarks();
    }

%>