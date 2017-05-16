importPackage( Packages.org.openedit.util );
importPackage( Packages.java.util );
importPackage( Packages.java.lang );
importPackage( Packages.org.entermediadb.modules.update );

var appname = "app-mediaapp";
var foldername = "mediaapp";

//http://dev.entermediasoftware.com/jenkins/job/app-mediaapp/lastSuccessfulBuild/artifact/deploy/app-mediaapp.zip
var zip = "http://dev.entermediasoftware.com/jenkins/job/@BRANCH@" + appname + "/lastSuccessfulBuild/artifact/deploy/" + appname + ".zip";

var root = moduleManager.getBean("root").getAbsolutePath();
var tmp = root + "/WEB-INF/tmp";

log.info("1. GET THE LATEST ZIP FILE");
var downloader = new Downloader();
downloader.download( zip, tmp + "/" + appname + ".zip");

log.info("2. UNZIP WAR FILE");
var unziper = new ZipUtil();
unziper.unzip(  tmp + "/" + appname + ".zip",  tmp );

var files = new FileUtils();
log.info("3. UPGRADE BASE DIR");
files.deleteAll( root + "/WEB-INF/base/" + foldername);
files.copyFiles( tmp + "/" + foldername, root + "/WEB-INF/base/" + foldername + "/");

log.info("4. CLEAN UP");
files.deleteAll(tmp);

log.info("5. UPGRADE COMPLETED");
