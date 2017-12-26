#include <gtk/gtk.h>
#include <stdio.h>

static void
clear_pressed (GtkEntry *entry, gint icon, GdkEvent *event, gpointer data)
{
   if (icon == GTK_ENTRY_ICON_SECONDARY)
     gtk_entry_set_text (entry, "");
}

static void
drag_begin_cb (GtkWidget      *widget,
               GdkDragContext *context,
               gpointer        user_data)
{
  gint pos;

  pos = gtk_entry_get_current_icon_drag_source (GTK_ENTRY (widget));
  if (pos != -1)
    gtk_drag_set_icon_name (context, "dialog-information", 2, 2);

  g_print ("drag begin %d\n", pos);
}

static void
drag_data_get_cb (GtkWidget        *widget,
                  GdkDragContext   *context,
                  GtkSelectionData *data,
                  guint             info,
                  guint             time,
                  gpointer          user_data)
{
  gint pos;

  pos = gtk_entry_get_current_icon_drag_source (GTK_ENTRY (widget));

  if (pos == GTK_ENTRY_ICON_PRIMARY)
    {
#if 0
      gint start, end;
      
      if (gtk_editable_get_selection_bounds (GTK_EDITABLE (widget), &start, &end))
        {
          gchar *str;
          
          str = gtk_editable_get_chars (GTK_EDITABLE (widget), start, end);
          gtk_selection_data_set_text (data, str, -1);
          g_free (str);
        }
#else
      gtk_selection_data_set_text (data, "XXX", -1);
#endif
    }
}

int
main (int argc, char **argv)
{
  GtkWidget *window;
  GtkWidget *grid;
  GtkWidget *label;
  GtkWidget *entry;
  GIcon *icon;
  GtkTargetList *tlist;

  gtk_init (&argc, &argv);

  window = gtk_window_new (GTK_WINDOW_TOPLEVEL);
  gtk_window_set_title (GTK_WINDOW (window), "Gtk Entry Icons Test");
  gtk_container_set_border_width (GTK_CONTAINER (window), 12);

  g_signal_connect (G_OBJECT (window), "destroy",
		    G_CALLBACK (gtk_main_quit), NULL);

  grid = gtk_grid_new ();
  gtk_container_add (GTK_CONTAINER (window), grid);
  gtk_grid_set_row_spacing (GTK_GRID (grid), 6);
  gtk_grid_set_column_spacing (GTK_GRID (grid), 6);

  /*
   * Open File - Sets the icon using a GIcon
   */
  label = gtk_label_new ("Open File:");
  gtk_grid_attach (GTK_GRID (grid), label, 0, 0, 1, 1);
  gtk_widget_set_halign (label, GTK_ALIGN_START);
  gtk_widget_set_valign (label, GTK_ALIGN_CENTER);

  entry = gtk_entry_new ();
  gtk_widget_set_hexpand (entry, TRUE);
  gtk_grid_attach (GTK_GRID (grid), entry, 1, 0, 1, 1);

  icon = g_themed_icon_new ("folder-symbolic");
  g_themed_icon_append_name (G_THEMED_ICON (icon), "folder-symbolic");

  gtk_entry_set_icon_from_gicon (GTK_ENTRY (entry),
				 GTK_ENTRY_ICON_PRIMARY,
				 icon);
  gtk_entry_set_icon_sensitive (GTK_ENTRY (entry),
			        GTK_ENTRY_ICON_PRIMARY,
				FALSE);

  gtk_entry_set_icon_tooltip_text (GTK_ENTRY (entry),
				   GTK_ENTRY_ICON_PRIMARY,
				   "Open a file");

  /*
   * Save File - sets the icon using an icon name.
   */
  label = gtk_label_new ("Save File:");
  gtk_grid_attach (GTK_GRID (grid), label, 0, 1, 1, 1);
  gtk_widget_set_halign (label, GTK_ALIGN_START);
  gtk_widget_set_valign (label, GTK_ALIGN_CENTER);

  entry = gtk_entry_new ();
  gtk_widget_set_hexpand (entry, TRUE);
  gtk_grid_attach (GTK_GRID (grid), entry, 1, 1, 1, 1);
  gtk_entry_set_text (GTK_ENTRY (entry), "‏Right-to-left");
  gtk_widget_set_direction (entry, GTK_TEXT_DIR_RTL);
  
  gtk_entry_set_icon_from_icon_name (GTK_ENTRY (entry),
                                     GTK_ENTRY_ICON_PRIMARY,
                                     "document-save-symbolic");
  gtk_entry_set_icon_tooltip_text (GTK_ENTRY (entry),
				   GTK_ENTRY_ICON_PRIMARY,
				   "Save a file");
  tlist = gtk_target_list_new (NULL, 0);
  gtk_target_list_add_text_targets (tlist, 0);
  gtk_entry_set_icon_drag_source (GTK_ENTRY (entry),
                                  GTK_ENTRY_ICON_PRIMARY,
                                  tlist, GDK_ACTION_COPY); 
  g_signal_connect_after (entry, "drag-begin", 
                          G_CALLBACK (drag_begin_cb), NULL);
  g_signal_connect (entry, "drag-data-get", 
                    G_CALLBACK (drag_data_get_cb), NULL);
  gtk_target_list_unref (tlist);

  /*
   * Search - Uses a helper function
   */
  label = gtk_label_new ("Search:");
  gtk_grid_attach (GTK_GRID (grid), label, 0, 2, 1, 1);
  gtk_widget_set_halign (label, GTK_ALIGN_START);
  gtk_widget_set_valign (label, GTK_ALIGN_CENTER);

  entry = gtk_entry_new ();
  gtk_widget_set_hexpand (entry, TRUE);
  gtk_grid_attach (GTK_GRID (grid), entry, 1, 2, 1, 1);

  gtk_entry_set_icon_from_icon_name (GTK_ENTRY (entry),
                                     GTK_ENTRY_ICON_PRIMARY,
                                     "edit-find-symbolic");

  gtk_entry_set_icon_from_icon_name (GTK_ENTRY (entry),
                                     GTK_ENTRY_ICON_SECONDARY,
                                     "edit-clear-symbolic");

  g_signal_connect (entry, "icon-press", G_CALLBACK (clear_pressed), NULL);

  /*
   * Password - Sets the icon using an icon name
   */
  label = gtk_label_new ("Password:");
  gtk_grid_attach (GTK_GRID (grid), label, 0, 3, 1, 1);
  gtk_widget_set_halign (label, GTK_ALIGN_START);
  gtk_widget_set_valign (label, GTK_ALIGN_CENTER);

  entry = gtk_entry_new ();
  gtk_widget_set_hexpand (entry, TRUE);
  gtk_grid_attach (GTK_GRID (grid), entry, 1, 3, 1, 1);
  gtk_entry_set_visibility (GTK_ENTRY (entry), FALSE);

  gtk_entry_set_icon_from_icon_name (GTK_ENTRY (entry),
                                     GTK_ENTRY_ICON_PRIMARY,
                                     "dialog-password-symbolic");

  gtk_entry_set_icon_activatable (GTK_ENTRY (entry),
				  GTK_ENTRY_ICON_PRIMARY,
				  FALSE);

  /* Name - Does not set any icons. */
  label = gtk_label_new ("Name:");
  gtk_grid_attach (GTK_GRID (grid), label, 0, 4, 1, 1);
  gtk_widget_set_halign (label, GTK_ALIGN_START);
  gtk_widget_set_valign (label, GTK_ALIGN_CENTER);

  entry = gtk_entry_new ();
  gtk_widget_set_hexpand (entry, TRUE);
  gtk_grid_attach (GTK_GRID (grid), entry, 1, 4, 1, 1);

  gtk_widget_show_all (window);

  gtk_main();

  return 0;
}
